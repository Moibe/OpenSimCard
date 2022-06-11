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

    //Primer inserción...
    var message_1 = document.createTextNode("Esto es la inserción 1.");
    document.getElementById('div_elegido').appendChild(message_1);

    document.getElementById("div_elegido").insertAdjacentHTML("afterend", '<h1>Texto en H1</h1>');
    document.getElementById("div_elegido").insertAdjacentHTML("afterend", '<h2>Texto en H2</h2>');

    //Segunda insercción...
    var message_2 = document.createTextNode("<h1>Esto es la inserción 2.</h1>");
    document.getElementById('div_elegido').appendChild(message_2);

    //Tercera, incersión de HTML.
    document.getElementById("div_elegido").insertAdjacentHTML("afterend",
    `
    <div id="btnPaypal" type="submit">
    Esto es la inserción de HTML
    <h1>Con h1s incluso.</h1>
    <script src="/localpaypal.js?merchant=735A4R6642VWC"
    data-button="buynow"
    data-name="Digital Download"
    data-amount="5"
    data-currency="
    USD"
    data-size="small"
    data-noshipping= 1
    data-return="https://www.coding-depot.dev/es/success"
    data-cancel_return="https://www.coding-depot.dev/es/success"
    data-currency_code="USD"
    data-locale="es_ES"
    data-type="form"
    async>
</script>
    
    </div>
    `        );

        var texto_html = 
        `<script src="/localpaypal.js?merchant=735A4R6642VWC"
                 data-button="buynow"
                 data-name="Digital Download"
                 data-amount="5"
                 data-currency="USD"
                 data-size="small"
                 data-noshipping= 1
                 data-return="https://www.coding-depot.dev/es/success"
                 data-cancel_return="https://www.coding-depot.dev/es/success"
                 data-currency_code="USD"
                 data-locale="es_ES"
                 data-type="form"
                 async>
             </script>`

console.log("Esto es texto html...");
             console.log(texto_html)

             var nodo_texto = document.createTextNode(texto_html);
             console.log("Esto es nodo texto...");
             console.log(nodo_texto);
console.log("Ahora vamos a unir en el afterend...")
             document.getElementById("div_elegido").insertAdjacentHTML("afterend", texto_html
                 );
 
        

       /*  
       `
       <script src="/localpaypal.js?merchant=735A4R6642VWC"
                data-button="buynow"
                data-name="Digital Download"
                data-amount="5"
                data-currency="USD"
                data-size="small"
                data-noshipping= 1
                data-return="https://www.coding-depot.dev/es/success"
                data-cancel_return="<script>document.write(palabra)</script>"
                data-currency_code="USD"
                data-locale="es_ES"
                data-type="form"
                async>
            </script>
            `
             */


}