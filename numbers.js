//Éste documento contiene dos funciones: 
//hacer() obtiene el número y lo despliega al usuario. Es lanzado por el user al terminar de seleccionar país y servicio.
//leer() se mantiene leyendo la api cada minuto 15 veces. Es lanzado por la glasswindow para saber que desplegar.
var token = config.MY_API_TOKEN;
let any_country = false; 

function hacer(country, service, pais, servicio){

  console.log("Éste es el country:")
  console.log(country);
  console.log("Éste es el service:")
  console.log(service);

  //Tenemos aquí que hacer un paso extra si el usuario seleccionó Any Country...

  
  
  if(country == 182){

    any_country = true; 
    country = 34; 

  }
  
  

//obtenTzid es una promesa, aquí la estamos declarando...
//Aquí obtenemos la validación de que recibimos el servicio, pero el número lo obtendremos hasta la siguiente.
var obtenTzid = new Promise(
  
  function(resolve, reject){
    
    fetch('https://onlinesim.ru/api/getNum.php?apikey=' + token + '&service='+service+ '&country=' +country)
    .then(response => response.json()) //convierte la respuesta en datos.
    .then(data => 
      {if(data.response == 1) //Si data.response tiene un 1 significa que si se otorgó el servicio.
      { console.log("Si obtuvo un servicio:");
        console.log(data);
        tzid = data.tzid; //Guarda el tzid en la var resultado.
        resolve(tzid);
        //Aquí SE LLEGÓ A OBTENER CORRECTAMENTE EL SERVICIO.
        
      }
      else 
      {
        console.log("No se obtuvo el servicio (tzid)...");
        console.log("Aquí llegamos porque no hay números o por requests seguidos.");
        tzid = data.response; 
        reject(Error(tzid))}
        
      })
      
  });

  //Ejecución basado en el resultado de la promesa...
  obtenTzid.then
  (
    function(result) //Si ésta promesa se cumple, entonces...
    {
    console.log("Estamos en el .then de la promesa del tzid...")
    console.log(tzid); //Despliega el tzid obtenido.
    //Aquí irá anidada la promesa de checar número en el segundo chequeo, 
    //solo si se logra la primer promesa de obtener el servicio.

    //obtenNumero es una promesa, aquí la estamos declarando...
    //Aquí revisaremos el estado, primero para obtener el número de cel, después, si nos llegó el mensaje.
    var obtenNumero = new Promise(

      function(resolve, reject){
        
        fetch('http://onlinesim.ru/api/getState.php?apikey=' + token + '&tzid='+tzid)
        .then(response => response.json()) //convierte la respuesta en datos.
        .then(data => 
          {if(data[0].response == 'TZ_NUM_WAIT') //Si data.response tiene un TZ_NUM_WAIT significa que si se otorgó el servicio y estamos en espera.
          { console.log("Si obtuvo el número:");
            console.log(data);
            numero = data[0].number; //Guarda el tzid en la var numero.
            tiempo = data[0].time; //Guarda el tiempo.
            console.log("El tiempo disponible para éste número es...");
            console.log(tiempo)
            resolve(numero);
            exito = 1;
                                                
          }
          else 
          {
            console.log("No se obtuvo el número...");
            numero = data.response; 
            reject(Error(numero))}
          })
          
      });

        //Ejecución basada en el resultado de la segunda promesa. 
        obtenNumero.then
        (
        function(result) //Si ésta promesa se cumple, entonces...
        {
        //ESTA ES LA PROMESA PRINCIPAL CUANDO SI SE OBTUVO EL SERVICIO!
        console.log("Se cumplió la promesa principal...:");
        console.log(result);
        console.log(numero); //Despliega el numero obtenido.
        displayCard();
        startGlassWindow();
        displayCountDown();
       
        }, 
        
        function(err) //Si la segunda promesa no se logra cumplir, entonces...
        {
        console.log("Falla en la obtención de un mensaje o investigar en que cuando llegué aquí...");
        console.log(err); //Error...
        console.log(err.Error); //Error...
        console.log(numero)
        startGlassWindow();
        displayMessage(err, pais, servicio)
        }
        );

        }, 
        
        function(err) //Si la primer promesa (conseguir el servicio) no se logra cumplir, entonces...
        {

        //Se podría llegar aquí por un balance bajo: WARNING_LOW_BALANCE o NO_NUMBER, o por falla en el servicio.
        console.log("Falla en la obtención de un servicio (tzid)...");
        console.log(err); //Error...
        console.log(tzid); //tzid contendría el mensaje de error. 
        //Originalmente aquí desplegabamos el mensaje de que no se pudo y de que se inicie de nuevo. 
        //Pero si el usuario seleccionó Any Country, entonces en automático debe reiniciar el proceso AQUÍ.
        if(any_country == true){
          //Haz de todas formas el desplegado de error y GlassWindow.
          console.log("Haz de todas formas el desplegado de error y GlassWindow.");
          
          //La primer opción es nóo desplegar ningún mensaje porque seguimos buscando. 
          //displayMessage(tzid, pais, servicio);

          //La segunda es usar una nueva función que avisa que aún está buscando...
          stillSearching(); 

          startGlassWindow();
          //Repite el ciclo.
          console.log("Ahora estamos repitiendo el ciclo! Pero espera 15 segundos...");

          setTimeout(function() {
            console.log("Vamos a esperar 15 segundos para ejecutar siguiente búsqueda...");
            hacer(371, service, 'Latvia', servicio);
        }, 15000 );

        }
        else{
          
          console.log("Se terminó la búsqueda porque era un solo país.");
          displayMessage(tzid, pais, servicio);
          startGlassWindow();
        }
        
        }
      );
  
}

//Function leer() es usada por la glass window para obtener el mensaje leído. 
//usa la variable tzid que es donde guardamos en servicio vigente obtenido.
function leer(tzid){

 //obtenMensaje es una promesa, aquí la estamos declarando...
 //Aquí obtenemos el mensaje que recibirá el usuario.
 var obtenMensaje = new Promise(
   
   function(resolve, reject){

    //Vamos a agregar dos tipos de url, la de pruebas y la real...
    url_real = 'http://onlinesim.ru/api/getState.php?apikey=' + token + '&message_to_code=0&tzid='
    url_pruebas = 'http://127.0.0.1:8000/get_simio/'

    //fetch para solucionar CORS...
    /* fetch(url_pruebas, {
      "method": "GET",
      "headers": {
          'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/'
      }
    }) */

    /* //Ésta variable solo va con la url_real
    + tzid */
     
    //Aquí aplica la lógica necesaria para obtener el mensaje.
    fetch(url_real + tzid)
     .then(response => response.json()) //convierte la respuesta en datos.
     .then(data => 
      
       {
        console.log("ESTAMOS POR EL CAMINO CORRECTO...");
        if(bypass_leer == true){
          console.log("La variable Bypass fue igual a True...");
          //Por lo tanto será un mensaje de PRUEBA:
          //fake
         mensaje = "[53904836] This is your new bypassed Instagram code: 540904836."
         //AQUI LLEGARA EN AMBOS LADOS CON O SIN MENSAJE FAKE:

        }
        else{
          console.log("La variable bypass fue igual a false...");
          //Es decir, se debe de correr el proceso normal.
          //No solo desplegar el mensaje, más bien, 
          //incluso primero checar de forma normal si existe ese mensaje.
          //Real
          //Si data.response tiene un TZ_NUM_ANSWER significa que ya nos llegó el mensaje.
          if(data[0].response == 'TZ_NUM_ANSWER'){
                  //Real
                  mensaje = data[0].msg; 
                //AQUI LLEGARA EN AMBOS LADOS CON O SIN MENSAJE FAKE:
          } else 
          {
            console.log("Aún no se obtuvo el mensaje...");
            mensaje = data[0].response; 
            reject(Error(mensaje))}
            }

        if(1 == 1) //Llegaremos siempre a menos que no sea bypass y no haya haido aún respuesta. 
        { console.log("Si obtuvo el mensaje:");
         console.log(data);
         resolve(mensaje, tzid);
         exito = 1;
       }
       
       })  
    });
 
   //Ejecución basado en el resultado de la promesa...
   obtenMensaje.then
   (
     function(result) //Si ésta promesa se cumple, entonces...
     {
          console.log("El mensaje fue encontrado y será obfuscado....");
          mensajeEncontrado(obfusMessage(mensaje), tzid);
     }, 
     
     function(err) //Si el mensaje no ha llegado, entonces...
     {
     //Despliega info que describa que la glass window sigue esperando.
     console.log(err); //Error...
     console.log(mensaje);
     }
   );
     
 }

