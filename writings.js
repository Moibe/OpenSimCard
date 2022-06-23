function writeAtInit(glass) {
  
   //ESCRIBIR EN GLASSINTRO

   active_glass = glass;
   console.log("EL ACTIVE GLASS ES:" + active_glass);

   intro1_text = jsonTranslations[idioma].intro1_text;
   console.log("Probando con el primer texto..."); 
   console.log("intro1_text es:" +intro1_text);
   intro2_text = jsonTranslations[idioma].intro2_text;
   intro3_text = jsonTranslations[idioma].intro3_text;
 
   addTextRow(intro1_text, 1 ,"intro_uno", glass);
   addTextRow(intro2_text , 2 ,"intro_dos", glass);
   addTextRow(intro3_text, 3 ,"intro_tres", glass);
    
}

function writeAtSuccess(glass, mensaje_a_escribir){

   exito1_text = jsonTranslations[idioma]. exito1_text;
   exito2_text = jsonTranslations[idioma]. exito2_text;
   exito3_text = jsonTranslations[idioma]. exito3_text;
       
    //Glasswindow showed when message found...
    document.getElementById("renglon_uno").innerHTML = bullet_icon + exito1_text;
    document.getElementById("countDownText").innerHTML = "";
    document.getElementById("renglon_tres").innerHTML = message_icon + mensaje_a_escribir;
    document.getElementById("renglon_cinco").innerHTML = payment_icon + exito2_text;
    document.getElementById("renglon_seis").innerHTML = bullet_icon + exito3_text;


}

function writeAtStill(glass) {
  
    //ESCRIBIR EN GLASSINTRO
 
    active_glass = glass;
    console.log("EL ACTIVE GLASS ES:" + active_glass);
 
    stillSearching_text = jsonTranslations[idioma].stillSearching_text;
          
    addTextRow(stillSearching_text, 1, "renglon_uno", glass);
     
 }

 function writeAtMessage(glass, mensaje_error, pais, servicio) {

    //ESCRIBIR EN GLASSINTRO
    console.log("Estamos en WriteAtMessage...")
    active_glass = glass;
    console.log("EL ACTIVE GLASS ES:" + active_glass);

    if((mensaje_error=="NO_NUMBER")||(mensaje_error=="NO_NUMBER_FOR_FORWARD")){

    //NONUMBER
    
    console.log("Pasamos por NONUMBER...");
    console.log("Y el glass definido es:" + glass) ;
    noNumber1_text = jsonTranslations[idioma].noNumber1_text;
    noNumber1bis_text = jsonTranslations[idioma].noNumber1bis_text;

    noNumber2_text = jsonTranslations[idioma].noNumber2_text;
    noNumber3_text = jsonTranslations[idioma].noNumber3_text;

    addTextRow(noNumber1_text + pais + "-" + servicio + noNumber1bis_text, 1, "renglon_uno", glass);
    addTextRow(noNumber2_text, 2, "renglon_dos", glass);
    addTextRow(noNumber3_text, 3, "renglon_tres", glass);

    //acción extra...
    habilitarBoton();

    }

    else if(mensaje_error=="WARNING_LOW_BALANCE"){
  
    //LOWBALANCE
    console.log("Pasamos por LOWBALANCE...");
    console.log("Y el glass definido es:" + glass) ; 
    lowBalance1_text = jsonTranslations[idioma].lowBalance1_text;
       
    addTextRow(bullet_icon + lowBalance1_text, 4, "renglon_uno", glass);
    addTextRow(timer_icon + '5:00', 2, "countDownText", glass);

    //acción extra...
    startCountdownTimer("low_balance");

    }
    else if(mensaje_error=="EXCEEDED_CONCURRENT_OPERATIONS"){

      //EXCEEDED_CONCURRENT_OPERATIONS
      console.log("Pasamos por EXCEEDED_CONCURRENT_OPERATIONS..."); 
      console.log("Y el glass definido es:" + glass) ;
      console.log("Definir que desplegar..."); 

      console.log("Y en éste punto viene vacío el glass recibido.");
      console.log("Glass Recibido:" + glass);

      
      
      
    }
    else   {

    //ELSE 

    console.log("Pasamos por ELSE... porque el mensaje de error es..." + mensaje_error); 
    console.log("Y el glass definido es:" + glass) ;
    elseCases1_text = jsonTranslations[idioma].elseCases1_text;

    addTextRow(bullet_icon + mensaje_error, 1, glass);
    addTextRow(timer_icon + '5:00', 2, glass);
    addTextRow(bullet_icon + elseCases1_text, 4, glass);

    //acción extra...
    console.log("LLEGUE AQUÏ EN EL ELSE DE LOS MENSAJES DE ERROR...")
    startCountdownTimer("mensaje");
    }
    
 }


 function writeAtCountDown(glass) {

    active_glass = glass;
    console.log("EL ACTIVE GLASS ES:" + active_glass);

    simReady1_text = jsonTranslations[idioma].simReady1_text;
    simReady3_text = jsonTranslations[idioma].simReady3_text;
    simReady5_text = jsonTranslations[idioma].simReady5_text;
    
    // add p element to the glass2_textrows
    addTextRow(bullet_icon + simReady1_text, 1 ,"renglon_uno", glass);
    addTextRow(phone_icon + numero, 2 ,"renglon_dos", glass);
    addTextRow(bullet_icon + simReady3_text , 3 ,"renglon_tres", glass);
    addTextRow(timer_icon + '', 4, "countDownText", glass);
    addTextRow(listening_icon + simReady5_text, 5, "renglon_cinco", glass);
    addTextRow('', 6, "renglon_seis", glass);
    
    //acción extra.
    startCountdownTimer();
    
}
