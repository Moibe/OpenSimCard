//Idioma
jsonTranslations = JSON.parse(traducciones);

//Nodo
verifNode_Success = localStorage.getItem('verifnode');
console.log("Ésto es el chequeo desde Success:...");
console.log(verifNode_Success);

function checkNode(tzid_recibido, nodo_recibido){

    console.log("Estamos dentro de la función...");
    console.log("Y ésto es el tzid recibido por la función...");
    console.log(tzid_recibido);

    console.log("Y ésto es el nodo recibido por la función...");
    console.log(nodo_recibido);

    //Por otra parte, requerimos saber cual es el nodo que está guardado en el storagelocal. 
        nodoOficial = localStorage.getItem('verifnode');
        console.log("Éste es el nodo guardado de forma local:...")
        console.log(nodoOficial);

    //Si ambos son iguales, continua....

    if(nodo_recibido == nodoOficial){
        console.log("Ambos son iguales!");
        obtenMensajeFinal();
    }
    else{
        console.log("Son DIFERENTES!!!");
    }

}

function fillCard(objeto){
    console.log("Estamos dentro de la función FILLCARD."); 
    console.log("Ésto es el objeto de datos del response...");
    console.log(objeto); 
    
    //Obten las variables...
    country = objeto[0].country;
    service = objeto[0].service;

    //Pequeña corrección por un problema externo que viene de la API. 
    //En donde el servicio no es Fcebook pero dejaron el número. 

    if(service == 3223){
        service = "Facebook";
    }

    number = objeto[0].number;
    
    // get cardText1
    let cardText1 = document.getElementById('cardText1');
    let cardText2 = document.getElementById('cardText2');
    let cardText3 = document.getElementById('cardText3');

    //Fill
    
    //Ésto no se usará más, pero getInfoCountry puede servir para muchas otras cosas...
    //cardText1.innerHTML = getInfoCountry(country, service);
    cardText2.innerHTML = capitalize(service);
    cardText3.innerHTML = number;

    PaisCard = localStorage.getItem('pais');
    console.log("Éste es el país en el País Card...");
    console.log(PaisCard);
    cardText1.innerHTML = PaisCard;
}