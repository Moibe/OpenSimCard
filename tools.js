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

function construyePaypal(){


    direccion = "";

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
    paypalScript.setAttribute("data-cancel_return", "http://127.0.0.1:5501/" + direccion);
    paypalScript.setAttribute("data-currency_code", "USD");
    paypalScript.setAttribute("data-locale", "es_ES");
    paypalScript.setAttribute("data-type", "form");
    paypalScript.setAttribute("async", "");

    // add the newly created element and its content into the DOM
    let divBtnPaypal = document.getElementById("btnPaypal");
    const currentDiv = document.getElementById("referencia");
    divBtnPaypal.insertBefore(paypalScript, currentDiv);

}