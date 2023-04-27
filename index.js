//VARIABLES

//SETUPS
//Colección de países a usar.
let setup_paises = 'normal';
let setup_servicios = 'normal';
console.log("Se creo setup_servicios y es éste:" + setup_servicios);
let jsonSetups_Paises;
let jsonSetups_Servicios;

//Idioma
let idioma = 'english';
//Declaramos el json con las variables de idioma.
let jsonTranslations = JSON.parse(traducciones);

//MOMENTOS DE FUNCIONES (para traducción en tiempo real).
let funcion_actual;

//TIEMPOS
// use this variable to set the timing of progress bar
let timing_bar = 4;
let timing_elements = 0;
let timing_glass = 0;

// use this variable to control coundDownTimer waiting time
let countDownTimerTime = 5;
let coolDownTimerTime = 4;
let lowBalanceTimerTime = 10;
var countDownTimer;

//ICONS
bullet_icon  = "💀";
timer_icon = "⏱️";
phone_icon = "📱";
message_icon = "✉️";
listening_icon = "📡";
payment_icon = "💳";

//PAYMENTS
//Payment Vars 
//merchant = "735A4R6642VWC"; //Kim
merchant = "8EGDH39V2EZSN"; //Dreamnet

//ARRANQUE

// get btnSubmit
const btnSubmit = document.getElementById('btnSubmit');
//btnSubmit.style.display = 'none';

//Quizá no necesitemos ésta parte porque al inicio no estará creado.
/* // get btnPaypal
const btnPaypal = document.getElementById('btnPaypal');
btnPaypal.style.display = 'none'; */



// get glassIntro
const glassIntro = document.getElementById('glassIntro');

// hide svg card at start
$('#svg-card').css('display', 'none');

//INICIO
// once dropdownCountry and dropdownService are both selected, call startProgressBar and startProcess
const dropdownCountry = document.getElementById('dropdownCountry');
const dropdownService = document.getElementById('dropdownService');

// call startProgressBar and startProcess when btnSubmit is clicked
btnSubmit.addEventListener('click', function () {
    if (dropdownCountry.value != "" && dropdownService.value != "") {

        //Se estableció ésta búsqueda aquí, porque si se hace después de buscar tzid, no puede escribir...
        //...correctamente errores que lleven los textos de Country y Service.
        // get the value of the first dropdown
        const Country = dropdownCountry.options[dropdownCountry.selectedIndex].value;
        //get the value of the second dropdown
        const Service = dropdownService.options[dropdownService.selectedIndex].value;

        // get the value of the first dropdown
        const Pais = dropdownCountry.options[dropdownCountry.selectedIndex].innerHTML;
        //get the value of the second dropdown
        const Servicio = dropdownService.options[dropdownService.selectedIndex].innerHTML;
      
        //setTimeout(function() {
            startProgressBar();
            startProcess(Country, Service, Pais, Servicio);
        //}, 30000 );
                        
    }
    else {
        alert("Please select Country and Service options.");
    }
});

//BOTON CHANGE
//Utilidades del botón.
//El botón hace una serie de acciones dependiendo del modo en el que está...
//Por ejemplo, si está en inglés, cambia a español, y viceversa.
//Los estados son optionOne y optionTwo.
const optionButton = (e) => {
    //Primer SET de acciones estando en su primer estado o estado default.
    if (e.classList.contains('optionOne')) {
        
        //Remueve el estado anterior y coloca el nuevo.
        e.classList.remove('optionOne')
        e.classList.add('optionTwo')

        //El Idioma
        idioma = 'spanish';

        //Corre los translatables iniciales.
        runthisfunction();
        
        //Cambia el nombre desplegado en la opción.
        e.innerHTML = `Español ✨ `;
        
        //El título de la forma.
        //formText.innerHTML = `My Form Version B`
        
        //El fondo. 
        body.classList.add('gradient1');
        body.classList.remove('gradient');
        
        // $('#adddedSuccessfull').css('display', 'none')

        //Los colores de la barra. 
        $('.growing-bar').removeClass('growing_barA')
        $('.growing-bar').removeClass('growing_barBPurple')
        $('.growing-bar').addClass('growingBarAnimation')

        //Los movimientos del glass.
        glass2.classList.remove('animate__fadeInRight')
        glass2.classList.remove('animate__fadeIn')
        //El confetti
        $('.confetti__button').attr('disabled', 'false');
        $('.confetti__button').css('cursor', 'default');
        
    }
    //Segundo SET de acciones estándo en el segundo estado después de haber recibido un click.
    else {

        //Remueve el estado anterior y coloca el nuevo.
        e.classList.remove('optionTwo');
        e.classList.add('optionOne');

        //El Idioma
        idioma = 'english';

        //Corre los translatables iniciales.
        runthisfunction();

        //Cambia el nombre desplegado en la opción.
        e.innerHTML = `English`;
        
        //El título de la forma.
        //formText.innerHTML = `My Form Version A`
        
        //El fondo. 
        body.classList.remove('gradient1');
        body.classList.add('gradient');

        // $('#adddedSuccessfull').css('display', 'none')
        
        //La Barra 
        $('.growing-bar').removeClass('growingBarAnimation');
        $('.growing-bar').removeClass('growing_barBPurple');
        $('.growing-bar').addClass('growing_barA');

        //El Glass
        glass2.classList.remove('animate__fadeInRight');
        glass2.classList.remove('animate__fadeIn');

        //El Confetti
        $('.confetti__button').attr('disabled', 'false');
        $('.confetti__button').css('cursor', 'default');
    }
}

// reset the form
const clickToReturn = (e) => {
    location.reload();
}

//FUNCIONES

function initializer(){

    //Momentaneamente haremos más grande el área del glassIntro...
    let glass2Intro = document.getElementById('glassIntro_textrows');
    glass2Intro.style.height = '100px';

    funcion_actual = "initializer";
    console.log("Se creo setup_servicios y es éste:" + setup_servicios);
    console.log("La función actual es:" + funcion_actual);
    
    //SETS DE DROPDOWNS
    addOptionPaises(); 
    addOptionServicios(); 
    

    //LANGUAGE
    //Obtenemos el json con las variables de idioma.
    //jsonTranslations = JSON.parse(traducciones);

    //Ésta es la función que se recarga cuando vienes del botón de traducción. 
    initializer_translatable(); 

    }
 

function startProgressBar() {
    console.log("startProgressBar");

    // hide the submit button
    btnSubmit.style.display = 'none';

    //hide GlassIntro
    glassIntro.style.display = 'none';

    //Desaparece el div que contenia a los dropdownlists:
    let selectores = document.getElementById('selectores');
    selectores.style.display = 'none';

    //Desaparece el div del botón Get (temporalmente):
    let divBoton = document.getElementById('divBoton');
    divBoton.style.display = 'none';
    
    let glass1 = document.getElementById('glass1');
    glass1.classList.add('animate__fadeOut');

    setTimeout(() => {
        glass1.style.display = 'none';
        $('#barid').css('display', 'block');
        $('.growing-bar').css('animation', `${timing_bar}s linear 0s 1 normal none running fill`);
    }, 1000);


    
}

function startGlassWindow(){

    let glass2Textrows = document.getElementById('glass2_textrows');
    glass2Textrows.style.height = '160px';

    let glass2 = document.getElementById('glass2');

    setTimeout(() => {
        $('#barid').css('display', 'none');
        glass2.style.display = 'flex';
        
        glass2.classList.add('animate__fadeInUp');
    }, timing_glass * 1000);

    //Ésta función solo despliega la ventana, pero no los mensajes que despliega.
    //Esos mensajes se despliegan desde numbers.

}

function stillSearching(){

    funcion_actual = "stillSearching";
    console.log("La función actual es:" + funcion_actual);

    writeAtStill('glass2_textrows');
    
}

function displayMessage(mensaje_error, pais, servicio) {

    funcion_actual = "displayMessage";
    console.log("La función actual es:" + funcion_actual);

    //Ésta función maneja el texto a desplegar y las acciones cuando regresa un error en lugar del servicio.
    //Los mensajes y las acciones correspondientes las ejecuta en WriteAtMessage();
    writeAtMessage('glass2_textrows',mensaje_error, pais, servicio);
  
}

function displayCountDown() {

    funcion_actual = "displayCountdown";
    console.log("La función actual es:" + funcion_actual);

    console.log("Estoy en la función DISPLAYCOUNTDOWN!!!");
    writeAtCountDown('glass2_textrows');
    
 
}

function startCountdownTimer(tipo_de_conteo) {
    //El inicio del contador puede ser por tipo: mensaje, que es debido a un error, 
    //o tipo servicio que es el tiempo que se tiene para la espera del servicio. 

    //Establece la fecha de éste momento sea cual sea el tipo de contador.
    let countDownTime = new Date();
    
    if(tipo_de_conteo == "mensaje"){
        conteo = coolDownTimerTime;
        countDown_message = jsonTranslations[idioma].timeOver_coolDown;
        }
    else if(tipo_de_conteo == "low_balance"){
        conteo = lowBalanceTimerTime;
        countDown_message = jsonTranslations[idioma].timeOver_lowBalance;
       }
    else {
        conteo = tiempo;
        //Hardcode solo para hacer rápido lo de cuando caduda.
        if(bypass_waitMessage == true){
            conteo = bypass_timer;
        }
       
        countDown_message = jsonTranslations[idioma].timeOver_timeOver;
        }

    //Set the parameters based the count choosen.
    //countDownTime.setMinutes(countDownTime.getMinutes() + conteo);
    countDownTime.setSeconds(countDownTime.getSeconds() + conteo)
   
    // Update the count down every 1 second
    countDownTimer = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownTime - now;

        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countDownText").innerHTML = timer_icon + minutes + "m " + seconds + "s ";
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(countDownTimer);
         
            writeAtTimeOver(countDown_message);

        }
        if(tipo_de_conteo != "mensaje"){
        // run the fake process every minute
        if (seconds == 1) {
            // console log
            console.log("running leer(tzid) at " + minutes + ":" + seconds);

            //Aquí también hacemos DIAMONDCHECK
            if(diamond == true){
                leer_diamond(tzid);
            }else{
                leer(tzid);
            }


            
        }
    }

    }, 1000);
}

function habilitarBoton(){

    //Reaparece el div del botón Get:
    //let divBoton = document.getElementById('divBoton');
    divBoton.style.display = 'flex';

     // enable button
     btnSubmit.style.display = 'block';

     //También los textos de los botones se usarán como texto variable.
     btnSubmit_text = jsonTranslations[idioma].btnSubmitStart_text;
     btnSubmit.value = btnSubmit_text;
     
     // reload the page on click
     btnSubmit.addEventListener('click', clickToReturn);

}


// use this function to stop the progress bar
function stopProgressBar() {
    $('.growing-bar').css('animation', 'asad');
    $('#clickReturn').css('display', 'block');
    $('#barid').css('visibility', 'hidden');
}

function 
mensajeEncontrado(mensaje_a_escribir){

    /* //Con los textos actuales el cambio de altura de la ventana no es necesario.
    let glass2Textrows = document.getElementById('glass2_textrows');
    glass2Textrows.style.height = '150px' */

    //Usará ésta función si sí se consiguió el servicio.
    writeAtSuccess(mensaje_a_escribir);
                
    clearInterval(countDownTimer);
    
    
    //Reaparece el div del botón Get:
    //let divBoton = document.getElementById('divBoton');
    divBoton.style.display = 'flex';
    //Ver si no es mucho peso construir el botón de paypal en éste momento. 
    //Los parámetros que se le dan son el tzid que viene del éxito en la obtención del mensaje...
    //...y de la creación al vuelo del nodo de verificación.
    construyePaypal(tzid, createVerifNode());
        
}

function displayCard() {
    //Solo se ejecutará si se logra obtener el número...
        
    setTimeout(function () {
        let x = "Hello world! Done!!";
        $('#adddedSuccessfull').html(x);
        $('#adddedSuccessfull').css('display', 'block');
        stopProgressBar();

        // get cardText1
        let cardText1 = document.getElementById('cardText1');
        let cardText2 = document.getElementById('cardText2');
        let cardText3 = document.getElementById('cardText3');

        //Revisar si está siendo redundante ésto.
        // get the text of the first dropdown
        const dropdownCountryValue = dropdownCountry.options[dropdownCountry.selectedIndex].innerHTML;
        // get the text of the second dropdown
        const dropdownServiceValue = dropdownService.options[dropdownService.selectedIndex].innerHTML;
 
        cardText1.innerHTML = dropdownCountryValue;
        cardText2.innerHTML = dropdownServiceValue;

        // generate random phone number
        //let phoneNumber = Math.floor(Math.random() * 10000000000000);
        //cardText3.innerHTML = '+' + phoneNumber;
        cardText3.innerHTML = numero;

        // show svg-card
        $('#svg-card').css('display', 'block');

        startCardAnimation();
        }, `${timing_elements}000`);

}

// long running process goes here
function startProcess(Country_value, Service_value, Pais_texto, Servicio_texto) {

    //El proceso iniciará cuando la barra acabe de cargar.} o al mismo tiempo?
    // when the process is done, show the success message
    // and hide the progress bar
    setTimeout(function () {
        
        //Antes guarda el país para su uso futuro.
        localStorage.setItem('pais', Pais_texto);
        PaisNode = localStorage.getItem('pais');
        
        //Aquí iniciamos la conexión con OnlineSim.
        //Y éste IF decide si los scripts se ejecutan desde los obfuscados en producción que emiten desde...
        //diamondNode, o si lo hacemos desde los locales via el else.
        if(diamond == true){
            hacer_diamond(Country_value, Service_value, Pais_texto, Servicio_texto);
        }else{
            hacer(Country_value, Service_value, Pais_texto, Servicio_texto);
        }
        
    }, `${timing_bar}000`);
}

function startCardAnimation() {
    gsap.timeline()
        .set('svg', { opacity: 1 })
        .set('.scratches', { rotation: 70, x: 450, y: -10 })
        .set('#tri2', { scale: 0.5 })
        .from('#cardMask rect', { scale: 0, rotation: -20, duration: 2, transformOrigin: '50% 50%', ease: 'expo.inOut' }, 0)
        .to('#tri1', {
            motionPath: {
                path: "#midC",
                align: "#midC",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 1,
                end: 0
            }, duration: 6, repeat: -1, ease: 'none', repeatDelay: 1
        }, 0.5)
        .to('#tri2', {
            motionPath: {
                path: "#innerC",
                align: "#innerC",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
            }, duration: 5, repeat: -1, ease: 'none', repeatDelay: 1
        }, 1.5)
        .from('.coil', { attr: { 'stroke-dashoffset': (i) => (i == 1) ? -28 : 28 }, ease: 'none', duration: 1, repeat: -1 }, 1)
        .fromTo('#orb1', { y: 160 }, { y: -20, ease: 'circ', repeat: -1, yoyo: true, duration: 1 }, 0.8)
        .from('.logoPt', { x: (i) => [18, -10][i], duration: 1.2, ease: 'expo.inOut' }, 0.9)
        .from('svg text', { x: -40, duration: 1.1, ease: 'expo.inOut', stagger: 0.2 }, 1)
        .from('.txtBox', { scaleX: 0, transformOrigin: '100% 0', duration: 1.1, ease: 'expo.inOut', stagger: 0.2 }, 1)
        .fromTo('#wave1', { x: 0, y: 0 }, { duration: 5, x: -701, y: 815, repeat: -1, ease: 'none' }, 0)
        .fromTo('#wave2', { x: 0, y: 0 }, { duration: 6, x: 804, y: -917, repeat: -1, ease: 'none', onRepeat: () => starShine.play(0) }, 0)
    // .set("#cardText1", { text: "February435" });

    starShine = gsap.timeline()
        .set('#star', { scale: 0, transformOrigin: '50% 50%', x: 2, y: 10 })
        .to('#star', { scale: 1, repeat: 1, yoyo: true, yoyoEase: true, duration: 0.4, ease: 'power4' }, 0)
        .fromTo('#star', { rotate: -20 }, { rotate: 120, duration: 0.8, ease: 'none' }, 0);
}
