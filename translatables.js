function initializer_translatable(){
    //GLASS
    const container = document.getElementById('glassIntro_textrows');
    container.textContent = '';

    //DROPDOWNLISTS:
    let etiquetaService = document.getElementById('labelService');
    let etiquetaCountry = document.getElementById('labelCountry');
   
    etiquetaService.innerHTML= jsonTranslations[idioma].etiquetaService;
    etiquetaCountry.innerHTML= jsonTranslations[idioma].etiquetaCountry;

    //BUTTONS
    console.log("Estoy en initializer_translatable...")
    btnSubmit_text = jsonTranslations[idioma].btnSubmitInit_text;
    btnSubmit.value = btnSubmit_text;
    writeAtInit('glassIntro_textrows');
}