//VARIABLES
// use this variable to set the timing of progress bar
let timing_bar = 5;
let timing_elements = 0;
let timing_glass = 0;

//ICONS
bullet_icon  = "-";
timer_icon = "⏱️";
phone_icon = "📱";
message_icon = "✉️";
listening_icon = "📡";
payment_icon = "💳";

//Payment Vars
merchant = "735A4R6642VWC";

// use this variable to control coundDownTimer waiting time
let countDownTimerTime = 5;
let coolDownTimerTime = 4;
let lowBalanceTimerTime = 10;

var countDownTimer;

//ARRANQUE

// get btnSubmit
const btnSubmit = document.getElementById('btnSubmit');
//btnSubmit.style.display = 'none';

// get btnPaypal
const btnPaypal = document.getElementById('btnPaypal');
btnPaypal.style.display = 'none';

// get glassIntro
const glassIntro = document.getElementById('glassIntro');

// hide svg card at start
$('#svg-card').css('display', 'none');

//INICIO
// once dropdown1 and dropdown2 are both selected, call startProgressBar and startProcess
const dropdown1 = document.getElementById('dropdown1');
const dropdown2 = document.getElementById('dropdown2');

// call startProgressBar and startProcess when btnSubmit is clicked
btnSubmit.addEventListener('click', function () {
    if (dropdown1.value != "" && dropdown2.value != "") {

        //Se estableció ésta búsqueda aquí, porque si se hace después de buscar tzid, no puede escribir...
        //...correctamente errores que lleven los textos de Country y Service.
        // get the value of the first dropdown
        const Country = dropdown1.options[dropdown1.selectedIndex].value;
        //get the value of the second dropdown
        const Service = dropdown2.options[dropdown2.selectedIndex].value;

        // get the value of the first dropdown
        const Pais = dropdown1.options[dropdown1.selectedIndex].innerHTML;
        //get the value of the second dropdown
        const Servicio = dropdown2.options[dropdown2.selectedIndex].innerHTML;

        startProgressBar();
        startProcess(Country, Service, Pais, Servicio);
        
    }
    else {
        alert("Please select Country and Service options.");
    }
});

const optionButton = (e) => {
    if (e.classList.contains('optionOne')) {
        e.classList.remove('optionOne')
        e.classList.add('optionTwo')
        e.innerHTML = `Option B`;
        formText.innerHTML = `My Form Version B`
        body.classList.add('gradient1')
        body.classList.remove('gradient');
        // $('#adddedSuccessfull').css('display', 'none')
        $('.growing-bar').removeClass('growing_barA')
        $('.growing-bar').removeClass('growing_barBPurple')
        $('.growing-bar').addClass('growingBarAnimation')
        glass2.classList.remove('animate__fadeInRight')
        glass2.classList.remove('animate__fadeIn')
        $('.confetti__button').attr('disabled', 'false');
        $('.confetti__button').css('cursor', 'default');
    }
    else {
        e.classList.remove('optionTwo');
        e.classList.add('optionOne');
        e.innerHTML = `Option A`;
        formText.innerHTML = `My Form Version A`
        body.classList.remove('gradient1')
        body.classList.add('gradient')
        // $('#adddedSuccessfull').css('display', 'none')
        $('.growing-bar').removeClass('growingBarAnimation')
        $('.growing-bar').removeClass('growing_barBPurple')
        $('.growing-bar').addClass('growing_barA')
        glass2.classList.remove('animate__fadeInRight')
        glass2.classList.remove('animate__fadeIn')
        $('.confetti__button').attr('disabled', 'false')
        $('.confetti__button').css('cursor', 'default');
    }
}

// reset the form
const clickToReturn = (e) => {
    location.reload();
}

//FUNCIONES

function initText(){
    //Text in the glasswindow:
    addTextRow(bullet_icon + 'Receive SMS messages online, anywhere in the world 🌎', 1 ,"intro_uno", 'glassIntro_textrows');
    addTextRow(phone_icon + 'Superfast one-use simcards.', 2 ,"intro_dos", 'glassIntro_textrows');
    addTextRow(bullet_icon + 'For registering services and testing apps.', 3 ,"intro_tres", 'glassIntro_textrows');
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
    glass2Textrows.style.height = '150px'

    let glass2 = document.getElementById('glass2');

    setTimeout(() => {
        $('#barid').css('display', 'none');
        glass2.style.display = 'flex';
        
        glass2.classList.add('animate__fadeInUp');
    }, timing_glass * 1000);

    //Ésta función solo despliega la ventana, pero no los mensajes que despliega.
    //Esos mensajes se despliegan desde numbers.

}

function displayMessage(mensaje_error, pais, servicio) {
    //Ésta función maneja el texto a desplegar y las acciones cuando regresa un error en lugar del servicio.
    
    if((mensaje_error=="NO_NUMBER")||(mensaje_error=="NO_NUMBER_FOR_FORWARD")){
 
        //En estos casos no habrá tiempo de espera y se invitará a usar otro servicio.

        addTextRow(bullet_icon + 'No available numbers for ' + pais + '-' + servicio + ' right now.', 1, "renglon_uno", 'glass2_textrows');
        addTextRow(bullet_icon + 'We are supercharging new simcards.', 2, "renglon_dos", 'glass2_textrows');
        addTextRow(bullet_icon + 'In the meanwhile try another country or service. Thanks. 💖', 3, "renglon_tres", 'glass2_textrows');
        habilitarBoton();

    }
    else if(mensaje_error=="WARNING_LOW_BALANCE"){

        //En éste caso no podrás proporcionar el servicio hasta que se descongele saldo o pongas más. 

        addTextRow(bullet_icon + 'Service unavailable, please try again in 10 minutes...', 4, "renglon_uno", 'glass2_textrows');
        addTextRow(timer_icon + '5:00', 2, "countDownText", 'glass2_textrows');
        startCountdownTimer("low_balance");

    } else     
    {
        //Todos los demás casos
        addTextRow(bullet_icon + mensaje_error, 1, "renglon_uno");
        addTextRow(timer_icon + '5:00', 2, "countDownText");
        addTextRow(bullet_icon + 'We recommend you to wait a bit to try again...', 4, "renglon_tres");
        startCountdownTimer("mensaje");
    }
   
    //optionDIv.classList.add('buttonDIvOptoveride');

}

function displayCountDown() {
   
    // add p element to the glass2_textrows
    addTextRow(bullet_icon + 'Your simcard is ready.', 1 ,"renglon_uno", 'glass2_textrows');
    addTextRow(phone_icon + numero, 2 ,"renglon_dos", 'glass2_textrows');
    addTextRow(bullet_icon + 'You can use this number for the next:', 3 ,"renglon_tres", 'glass2_textrows');
    addTextRow(timer_icon + '', 4, "countDownText", 'glass2_textrows');
    addTextRow(listening_icon + 'Ready to receive messages, listening...', 5, "renglon_cinco", 'glass2_textrows');
    addTextRow('', 6, "renglon_seis", 'glass2_textrows');
    
    startCountdownTimer();
 
}

function startCountdownTimer(tipo_de_conteo) {
    //El inicio del contador puede ser por tipo: mensaje, que es debido a un error, 
    //o tipo servicio que es el tiempo que se tiene para la espera del servicio. 

    //Establece la fecha de éste momento sea cual sea el tipo de contador.
    let countDownTime = new Date();
    console.log("Tipo de Conteo:");
    console.log(tipo_de_conteo);
    if(tipo_de_conteo == "mensaje"){
        conteo = coolDownTimerTime;
        countDown_message = "Now you can try again..."}
    else if(tipo_de_conteo == "low_balance"){
        conteo = lowBalanceTimerTime;
        countDown_message = "Now you can try again, thanks for waiting..."}
    else {
        conteo = tiempo;
        //Hardcode solo para hacer rápido lo de cuando caduda.
        conteo = 400;
        countDown_message = "Your simcard expired."}

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
            document.getElementById("welcome").innerHTML = "";
            document.getElementById("numero").innerHTML = "";
            document.getElementById("tittle").innerHTML = "";
            document.getElementById("countDownText").innerHTML =countDown_message;
            document.getElementById("listener").innerHTML = bullet_icon + "You can try again anytime you want.";

            // enable button
            habilitarBoton();
        }
        if(tipo_de_conteo != "mensaje"){
        // run the fake process every minute
        if (seconds == 1) {
            // console log
            console.log("running leer(tzid) at " + minutes + ":" + seconds);
            leer(tzid);
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
     btnSubmit.value = "Start Over";
     starting_over = true;


     
     /* // enable button
     btnPaypal.style.display = 'block'; */
     
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
mensajeEncontrado(mensaje){

    /* //Con los textos actuales el cambio de altura de la ventana no es necesario.
    let glass2Textrows = document.getElementById('glass2_textrows');
    glass2Textrows.style.height = '150px' */
        
    //Glasswindow showed when message found...
        document.getElementById("renglon_uno").innerHTML = bullet_icon + "Your message has been received at:";
        document.getElementById("countDownText").innerHTML = "";
        document.getElementById("renglon_tres").innerHTML = message_icon + mensaje;
        document.getElementById("renglon_cinco").innerHTML = payment_icon + "Complete your payment to release the full message.";
        document.getElementById("renglon_seis").innerHTML = bullet_icon + "Thanks for using our service :)";
        clearInterval(countDownTimer);
        //Reaparece el div del botón Get:
        //let divBoton = document.getElementById('divBoton');
        divBoton.style.display = 'flex';
        btnPaypal.style.display = 'block';
        
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
        const dropdown1Value = dropdown1.options[dropdown1.selectedIndex].innerHTML;
        // get the text of the second dropdown
        const dropdown2Value = dropdown2.options[dropdown2.selectedIndex].innerHTML;

        cardText1.innerHTML = dropdown1Value;
        cardText2.innerHTML = dropdown2Value;

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

    // set fake timeout to simulate a long process
    // when the process is done, show the success message
    // and hide the progress bar
    setTimeout(function () {
        console.log("Timeout...");

        hacer(Country_value, Service_value, Pais_texto, Servicio_texto)

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
