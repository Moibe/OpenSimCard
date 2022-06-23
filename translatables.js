function initializer_translatable(){

    const container = document.getElementById('glassIntro_textrows');
    container.textContent = '';

    console.log("Estoy en initializer_translatable...")
    btnSubmit_text = jsonTranslations[idioma].btnSubmitInit_text;
    btnSubmit.value = btnSubmit_text;
    writeAtInit('glassIntro_textrows');
}