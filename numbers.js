// document.getElementById("submit_mint").onclick = hacer;

function hacer(service, country){

 console.log(service);
 console.log(country);


//obtenTzid es una promesa, aquí la estamos declarando...
var obtenTzid = new Promise(
  
  function(resolve, reject){
    
    fetch('https://onlinesim.ru/api/getNum.php?apikey=ba4948c08e3d1494b4d11c437a29c663&service='+service+ '&country=' +country)
    .then(response => response.json()) //convierte la respuesta en datos.
    .then(data => 
      {if(data.response == 1) //Si data.response tiene un 1 significa que si se otorgó el servicio.
      { console.log("Si obtuvo un servicio:");
        console.log(data);
        tzid = data.tzid; //Guarda el tzid en la var resultado.
        resolve(tzid)}
      else 
      {
        console.log("No se obtuvo el servicio...");
        tzid = data.response; 
        reject(Error(tzid))}
      })
      
  });

 
  //Ejecución basado en el resultado de la promesa...
  obtenTzid.then
  (
    function(result) //Si ésta promesa se cumple, entonces...
    {
    console.log(tzid); //Despliega el tzid obtenido.
    //Aquí irá anidada la promesa de checar número en el segundo chequeo, 
    //solo si se logra la primer promesa de obtener el servicio.

    //obtenNumero es una promesa, aquí la estamos declarando...
var obtenNumero = new Promise(

  function(resolve, reject){
    
    fetch('http://onlinesim.ru/api/getState.php?apikey=ba4948c08e3d1494b4d11c437a29c663&tzid='+tzid)
    .then(response => response.json()) //convierte la respuesta en datos.
    .then(data => 
      {if(data[0].response == 'TZ_NUM_WAIT') //Si data.response tiene un TZ_NUM_WAIT significa que si se otorgó el servicio.
      { console.log("Si obtuvo el número:");
        console.log(data);
        numero = data[0].number; //Guarda el tzid en la var resultado.
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

