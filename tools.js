function addTextRow(text, delay, id, glass) {
  
    console.log("Éste es el glass recibido:" + glass);
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

function addOptionPaises() {

    console.log("Estoy en la función addOptionPaises...");

    //obten los setups
    jsonSetups_Paises = JSON.parse(setups_paises);
    console.log("Ésto es Json Setups Países...");
    console.log(jsonSetups_Paises);

    //Esto es la colección especifica de países con la que trabajaremos.
    //Se está usando setups.json y por ahora no se usa seto.json.
    ddlCountries = jsonSetups_Paises[setup_paises];
    

    //Ahora obtén la información especifica de los países de ese setup.
    jsonPaises = JSON.parse(paises);
    console.log("Éstos son todos los países con su información específica...");
    console.log(jsonPaises);

    var ddl = document.getElementById('dropdownCountry');
    console.log("Esto es el DDL.");
    console.log(ddl);
   
    ddlCountries.forEach(llenaOpciones);

    function llenaOpciones(item) {
       
        console.log("Esto es el ITEM a secas...")
        console.log(item);
        itemStringificado = item.toString();
        console.log("Esto es el ITEM STRINGIFICADO...");
        console.log(itemStringificado);
        var option = document.createElement("option");
        
        option.innerHTML = itemStringificado;

        pais_especifico = jsonPaises[item];
        console.log(pais_especifico);
        console.log("Ésto es el código guardado en value...");
        console.log(pais_especifico['Code']);

        option.value = pais_especifico['Code'];

        ddl.options.add(option);
      }
 
}

function addOptionServicios() {

    console.log("Estoy en la función addOptionServicios...");

    //obten los setups
    jsonSetups_Servicios = JSON.parse(setups_servicios);
    console.log("Ésto es Json Setups Servicios...");
    console.log(jsonSetups_Servicios);

    //Esto es la colección especifica de servicios con la que trabajaremos.
    //Se está usando setups.json.
    ddlServices = jsonSetups_Servicios[setup_servicios];

    //Ahora obtén la información específica de cada servicio.
    jsonServicios = JSON.parse(servicios);
    console.log("Ésta es la información específica de todos los servicios...");
    console.log(jsonServicios);

    var ddl = document.getElementById('dropdownService');
    
    ddlServices.forEach(llenaOpciones);

    function llenaOpciones(item) {
       
        console.log("Esto es el ITEM a secas...")
        console.log(item);
        itemStringificado = item.toString();
        console.log("Esto es el ITEM STRINGIFICADO...");
        console.log(itemStringificado);
        var option = document.createElement("option");
        
        option.innerHTML = itemStringificado;

        servicio_especifico = jsonServicios[item];
        console.log(servicio_especifico);
        console.log("Ésto es el código guardado en value...");
        console.log(servicio_especifico['Name']);

        option.value = servicio_especifico['Name'];

        ddl.options.add(option);
      }

}

function runthisfunction(){
    console.log("FUNCIONA ÉSTA FUNCIÓN!!!!!!");
    console.log("El idioma actual es:" + idioma);
}