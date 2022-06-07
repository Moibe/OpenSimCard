url = 'http://onlinesim.ru/api/getState.php?apikey=C9zkn1LW4uKXy71-cKUVjb82-v5VxJK39-Q1pzusA5-nVPk96AW8h1J9J5&message_to_code=0&tzid=' + tzidparam + '&msg_list=0'
console.log("Ésta es la url...")
console.log(url);

/* const origin = req.headers.origin;
console.log(origin)
res.setHeader('Access-Control-Allow-Origin', origin); */

function checkSuccess(){

    
    fetch(url, {
        "method": "GET",
        "headers": {
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/'
        }
      })
      .then(response => response.json())
      .then(data => {
          if(data.response != null){
              console.log(data.response);
              console.log("La respuesta es undefined.");
              console.log("No hay un servicio relacionado.");
              mensaje = "[53904836] Éste es tu código de Instagram 54090. Gracias.";
              mensaje_obfuscado = obfusMessage(mensaje)
              escribeResultados(mensaje_obfuscado);
              }
              else{
                  console.log("Si hay un servicio relacionado.");
                  console.log(data[0].response);
                  mensaje = data[0].response;
                  mensaje_obfuscado = obfusMessage(mensaje)
                  escribeResultados(mensaje_obfuscado);
              }
          })
      .catch(err => {
        console.error(err);
      });
}

function escribeResultados(){
    addTextRow('Thanks for your purchase.', 1, "renglon_uno");
    addTextRow('Here is your message.', 2, "renglon_dos");
    addTextRow(mensaje_obfuscado, 3, "renglon_tres");
    addTextRow('You can copy your code directly here:', 4, "renglon_cuatro");
    addTextRow(mensaje_obfuscado, 3, "renglon_cinco");
}



  

      


