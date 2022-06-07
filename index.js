// use this variable to set the timing of progress bar
let timing = 7;
var tzid = "";
var numero = "";
exito = "";

// hide svg card at start
$('#svg-card').css('display', 'none');

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

function startProgressBar() {
    console.log("startProgressBar");
    $('#barid').css('visibility', 'visible');
    $('.growing-bar').css('animation', `${timing}s linear 0s 1 normal none running fill`);
    glass1.classList.add('animate__fadeOut');
    $('#glass1').css('opacity', '0');
    optionDIv.classList.add('buttonDIvOptoveride');
    setTimeout(function () {
        $('#glass2').css('position', 'absolute')
        glass2.classList.remove('animate__fadeInRight')
        glass2.classList.add('animate__fadeInRight1')
    }, 1000);
}

// use this function to stop the progress bar
function stopProgressBar() {
    $('.growing-bar').css('animation', 'asad');
    $('#clickReturn').css('display', 'block');
    $('#barid').css('visibility', 'hidden');
}

// long running process goes here
function fakeProcess() {
    let x = "Hello world! Done!!";

    //Aquí va el proceso:

    // get the value of the first dropdown
    const country = dropdown1.options[dropdown1.selectedIndex].value;
    // get the value of the second dropdown
    const service = dropdown2.options[dropdown2.selectedIndex].value;
    
    hacer(service, country);

    // set fake timeout to simulate a long process
    // when the process is done, show the success message
    // and hide the progress bar
    setTimeout(function () {
        console.log("Timeout...");

        $('#adddedSuccessfull').html(x);
        $('#adddedSuccessfull').css('display', 'block');
        stopProgressBar();

        if(exito == 1)
        {
            // show svg-card
            $('#svg-card').css('display', 'block');
            startCardAnimation();
        }
        else
        {
            console.log("No iniciaremos la animación...")
            //Regresar al origen.
        }

        

        // get cardText1
        let cardText1 = document.getElementById('cardText1');
        let cardText2 = document.getElementById('cardText2');
        let cardText3 = document.getElementById('cardText3');

        // get the value of the first dropdown
        const dropdown1Value = dropdown1.options[dropdown1.selectedIndex].innerHTML;
        // get the value of the second dropdown
        const dropdown2Value = dropdown2.options[dropdown2.selectedIndex].innerHTML;

        cardText3.innerHTML = dropdown1Value;
        cardText2.innerHTML = dropdown2Value;

        // generate random number between 9999 and 100000
        let randomNumber = Math.floor(Math.random() * (100000 - 9999 + 1)) + 9999;
        cardText1.innerHTML = numero;


    }, `${timing}000`);
}

// once dropdown1 and dropdown2 are both selected, call startProgressBar and fakeProcess
const dropdown1 = document.getElementById('dropdown1');
const dropdown2 = document.getElementById('dropdown2');


dropdown1.addEventListener('change', function () {
    if (dropdown1.value != '' && dropdown2.value != '') {
        startProgressBar();
        fakeProcess();
    }
});


dropdown2.addEventListener('change', function () {
    if (dropdown1.value != '' && dropdown2.value != '') {
        startProgressBar();
        fakeProcess();
    }
});

// const tl = startCardAnimation();

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
