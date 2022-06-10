url = 'http://onlinesim.ru/api/getState.php?apikey=C9zkn1LW4uKXy71-cKUVjb82-v5VxJK39-Q1pzusA5-nVPk96AW8h1J9J5&message_to_code=0&tzid=' + tzidparam + '&msg_list=0'
console.log("Ésta es la url...")
console.log(url);

/* const origin = req.headers.origin;
console.log(origin)
res.setHeader('Access-Control-Allow-Origin', origin); */

function checkSuccess(){
   
    fetch(url)
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
                  escribeResultados(mensaje);
              }
          })
      .catch(err => {
        console.error(err);
      });
}

function escribeResultados(){
    addTextRow('Thanks for your purchase.', 1, "renglon_uno", 'glass2_textrows');
    addTextRow('Here is your complete message:', 2, "renglon_dos", 'glass2_textrows');
    addTextRow(mensaje, 3, "renglon_tres", 'glass2_textrows');
    }



  

      


