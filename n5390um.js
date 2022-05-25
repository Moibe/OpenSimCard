//Éste documento contiene dos funciones: 
//hacer() obtiene el número y lo despliega al usuario. Es lanzado por el user al terminar de seleccionar país y servicio.
//leer() se mantiene leyendo la api cada minuto 15 veces. Es lanzado por la glasswindow para saber que desplegar.
function hacer(service, country){

 console.log(service);
 console.log(country);


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
        resolve(tzid)}
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
    console.log("El número obtenido es:");
    console.log(numero); //Despliega el numero obtenido.
    }, 
    
    function(err) //Si la segunda promesa no se logra cumplir, entonces...
    {
    console.log(err); //Error...
    console.log(numero)
    }
    );

    }, 
    
    function(err) //Si la primer promesa no se logra cumplir, entonces...
    {
    console.log(err); //Error...
    console.log(tzid)
    }
  );
    
}

//Function leer() es usada por la glass windo para obtener el mensaje leído. 
//usa la variable tzid que es donde guardamos en servicio vigente obtenido.
function leer(tzid){

 //obtenMensaje es una promesa, aquí la estamos declarando...
 //Aquí obtenemos el mensaje que recibirá el usuario.
 var obtenMensaje = new Promise(
   
   function(resolve, reject){
     
    //Aquí aplica la lógica necesaria para obtener el mensaje.
    fetch('http://onlinesim.ru/api/getState.php?apikey=C9zkn1LW4uKXy71-cKUVjb82-v5VxJK39-Q1pzusA5-nVPk96AW8h1J9J5&tzid='+tzid)
     .then(response => response.json()) //convierte la respuesta en datos.
     .then(data => 
       {if(data[0].response == 'TZ_NUM_WAIT') //Si data.response tiene un TZ_NUM_WAIT significa que si se otorgó el servicio y estamos en espera.
       { console.log("Si obtuvo el mensaje:");
         console.log(data);
         numero = data[0].number; //Guarda el tzid en la var numero.
         resolve(mensaje);
         exito = 1;
       }
       else 
       {
         console.log("Aún no se obtuvo el mensaje...");
         numero = data.response; 
         reject(Error(mensaje))}
       })  
       
   });
 
   //Ejecución basado en el resultado de la promesa...
   obtenMensaje.then
   (
     function(result) //Si ésta promesa se cumple, entonces...
     {
     console.log("El mensaje se obtuvo, codificarlo y presentarlo en la glass window.")
     console.log(mensaje); //Despliega el tzid obtenido.
     }, 
     
     function(err) //Si el mensaje no ha llegado, entonces...
     {
     //Despliega info que describa que la glass window sigue esperando.
     console.log(err); //Error...
     }
   );
     
 }

