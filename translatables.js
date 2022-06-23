function initializer_translatable(){
    btnSubmit_text = jsonTranslations[idioma].btnSubmitInit_text;
    btnSubmit.value = btnSubmit_text;
    writeAtInit('glassIntro_textrows');
}