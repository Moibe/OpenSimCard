//Éste documento contiene dos funciones: 
//hacer() obtiene el número y lo despliega al usuario. Es lanzado por el user al terminar de seleccionar país y servicio.
//leer() se mantiene leyendo la api cada minuto 15 veces. Es lanzado por la glasswindow para saber que desplegar.
function hacer(country, service, pais, servicio){

  console.log("Éste es el country:")
  console.log(country);
  console.log("Éste es el service:")
  console.log(service);

//obtenTzid es una promesa, aquí la estamos declarando...
//Aquí obtenemos la validación de que recibimos el servicio, pero el número lo obtendremos hasta la siguiente.
var obtenTzid = new Promise(
  
  function(resolve, reject){
    
    fetch('https://onlinesim.ru/api/getNum.php?apikey=C9zkn1LW4uKXy71-cKUVjb82-v5VxJK39-Q1pzusA5-nVPk96AW8h1J9J5&service='+service+ '&country=' +country)
    .then(response => response.json()) //convierte la respuesta en datos.
    .then(data => 
      {if(data.response == 1) //Si data.response tiene un 1 significa que si se otorgó el servicio.
      { console.log("Si obtuvo un servicio:");
        console.log(data);
        tzid = data.tzid; //Guarda el tzid en la var resultado.
        resolve(tzid);
        
        
      }
      else 
      {
        console.log("No se obtuvo el servicio (tzid)...");
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
        
        fetch('http://onlinesim.ru/api/getState.php?apikey=C9zkn1LW4uKXy71-cKUVjb82-v5VxJK39-Q1pzusA5-nVPk96AW8h1J9J5&tzid='+tzid)
        .then(response => response.json()) //convierte la respuesta en datos.
        .then(data => 
          {if(data[0].response == 'TZ_NUM_WAIT') //Si data.response tiene un TZ_NUM_WAIT significa que si se otorgó el servicio y estamos en espera.
          { console.log("Si obtuvo el número:");
            console.log(data);
            numero = data[0].number; //Guarda el tzid en la var numero.
            tiempo = data[0].time; //Guarda el tzid en la var numero.
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
        console.log("Esto es result...:");
        console.log(result)
        console.log(numero); //Despliega el numero obtenido.
        displayCard();
        startGlassWindow();
        displayCountDown();
       
        }, 
        
        function(err) //Si la segunda promesa no se logra cumplir, entonces...
        {
        console.log("Falla en la obtención de un mensaje o investigaar en que cuando llegué aquí...");
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

        //Se podría llegar aquí por un balance bajo: WARNING_LOW_BALANCE, o por falla en el servicio.
        console.log("Falla en la obtención de un servicio (tzid)...");
        console.log(err); //Error...
        console.log(tzid); //tzid contendría el mensaje de rror. 
        startGlassWindow();
        displayMessage(tzid, pais, servicio)
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
    url_real = 'http://onlinesim.ru/api/getState.php?apikey=C9zkn1LW4uKXy71-cKUVjb82-v5VxJK39-Q1pzusA5-nVPk96AW8h1J9J5&message_to_code=0&tzid='
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
      //Real
       //{if(data[0].response == 'TZ_NUM_ANSWER') //Si data.response tiene un TZ_NUM_ANSWER significa que ya nos llegó el mensaje.
       //Fake
       {if(1 == 1) //Si data.response tiene un TZ_NUM_ANSWER significa que ya nos llegó el mensaje.
       { console.log("Si obtuvo el mensaje:");
         console.log(data);
         //real
         //mensaje = data[0].msg; 
         //fake
         mensaje = "[53904836] Éste es tu nuevo código de Instagram 540904836."
         resolve(mensaje);
         exito = 1;
       }
       else 
       {
         console.log("Aún no se obtuvo el mensaje...");
         mensaje = data[0].response; 
         reject(Error(mensaje))}
       })  
    });
 
   //Ejecución basado en el resultado de la promesa...
   obtenMensaje.then
   (
     function(result) //Si ésta promesa se cumple, entonces...
     {
          mensajeEncontrado(obfusMessage(mensaje));
     }, 
     
     function(err) //Si el mensaje no ha llegado, entonces...
     {
     //Despliega info que describa que la glass window sigue esperando.
     console.log(err); //Error...
     console.log(mensaje);
     }
   );
     
 }

