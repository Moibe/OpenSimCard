function addTextRow(text, delay, id, glass) {
  
    which_glass = glass;
    
    let glass2Textrows = document.getElementById(which_glass);
    
    
    let p = document.createElement('p');
    // if id is not null then add id to the p element
    if (id != "") {
        p.id = id;
    }
    p.innerHTML = text;

    // if delay is not 0 then add delay to the p element
    if (delay != 0) {
        setTimeout(() => {
            glass2Textrows.appendChild(p);
        }, (timing_elements + delay) * 1000);
    } else {
        glass2Textrows.appendChild(p);
    }
}

function createVerifNode(){

        let tiempo = Math.floor(Date.now() / 1000); 
        console.log("Éste es el tiempo actual...");
        console.log("... que será nuestro seed...");
        console.log(tiempo);

        //Creacción de nodo de verificación...
        console.log("Y ahora lo guardamos como una variable local...");
        localStorage.setItem('verifnode', tiempo);
        verifNode = localStorage.getItem('verifnode');
        console.log("Ésto es el recién generado VerifNode que estoy enviando a la construcción del botón de Paypal:...")
        console.log(verifNode);

        return verifNode; 
}

function construyePaypal(tzid, nodo){

    var paypalScript = document.createElement("script");
    console.log("CREANDO PAYPAL_SCRIPT");
    console.log(paypalScript);
    paypalScript.type = "text/javascript";
    paypalScript.id = "btnPaypal";
    paypalScript.src = "/localpaypal.js?merchant=735A4R6642VWC";
    //Agregaremos los atributos....
    paypalScript.setAttribute("data-name", "Digital Download");
    paypalScript.setAttribute("data-amount", "5");
    paypalScript.setAttribute("data-currency", "USD");
    paypalScript.setAttribute("data-size", "small");
    paypalScript.setAttribute("data-noshipping", 1);
    paypalScript.setAttribute("data-return", "http://127.0.0.1:5501/");
    paypalScript.setAttribute("data-cancel_return", "http://127.0.0.1:5501/success.html?tzid=" + tzid + "&node=" + nodo);
    paypalScript.setAttribute("data-currency_code", "USD");
    paypalScript.setAttribute("data-locale", "es_ES");
    paypalScript.setAttribute("data-type", "form");
    paypalScript.setAttribute("async", "");

    // add the newly created element and its content into the DOM
    let divBtnPaypal = document.getElementById("btnPaypal");
    const currentDiv = document.getElementById("referencia");
    divBtnPaypal.insertBefore(paypalScript, currentDiv);

}

function capitalize(word) {
    const lower = word.toLowerCase();
    return word
    .charAt(0).toUpperCase() + lower.slice(1);
  }

function getInfoCountry(numero_pais, nombre_servicio){

    url_pais= "https://onlinesim.io/api/getNumbersStats.php?apikey=C9zkn1LW4uKXy71-cKUVjb82-v5VxJK39-Q1pzusA5-nVPk96AW8h1J9J5&country=" + numero_pais + "&service=" + nombre_servicio;
    console.log("Ésl país lo estamos sacando con ésta URL:")
    console.log(url_pais);
    
    fetch(url_pais)
      .then(response => response.json())
      .then(data => {
          if(data != null){

            //Aquí llega si sí existe esa combinación de país y servicio...
            console.log("Aquí llega si sí existe esa combinación de país y servicio...");

            console.log("Esto es data.name;");
            console.log(data.name);

            pais_texto = data.name; 
            return pais_texto; 
                        
        }
            else{
                
            //Aquí llega si no hay respuesta.
            console.log("No existe esa combinación...");
              }
          })
      .catch(err => {
        console.error(err);
        console.log("ESTAMOS EN EL CATCH ;) ");
        console.log("LLEGAR AQUÏ SIGNIFICA QUE NI SI QUIERA EXISTE EL SERVICIO... ;) ");
        console.log("pero ya no debería llegar aquí porque todas las calls que se le envién se deberán hacer... ;) ");
        //location.replace("http://127.0.0.1:5501/");
      });

}

function readJsonFile(file) {
    let bufferData = fs.readFileSync(file)
    let stData = bufferData.toString()
    let data = JSON.parse(stData)
    return data
}