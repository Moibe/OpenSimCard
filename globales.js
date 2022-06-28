function startSystems(){

    var inicializarVariables = new Promise(

    function(resolve, reject){

        if(startGlobals()){
            
            resolve();
        }
        else{
            reject();
        }
    });

    inicializarVariables.then
    (
        function(result) //Si ésta promesa se cumple, entonces...
        {
             console.log("Si se inicializaron las variables....");
             initializer();
        }, 
        
        function(err) //Si el mensaje no ha llegado, entonces...
        {
        console.log("No se inicializaron las variables...");
        console.log(err); //Error...
        
        }
      );

}
   

function startGlobals(){

console.log("Estoy corriendo StartGlobals...");



return true; 

}



