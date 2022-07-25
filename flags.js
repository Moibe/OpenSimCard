////BYPASSES

//BYPASS LLAMADOS A ONLINESIM desde DOMINIO
//Ésto evitará que se hagan llamados a onlinesim desde aquí si se está probando bajo una url o dominio. 
//De ser así los llamados vendrán desde sitio ajeno diamondnode.
//diamond = true significa que estámos ejecutando numbers desde diamondnode. 
//TERMINANTEMENTE ESTO DEBE ESTAR EN TRUE EN EL AMBIENTE DE PRODUCCIÓN
let diamond = true;

//BYPASS TIEMPO DE ESPERA OFICIAL
//Si está en true, no recibe el tiempo de espera oficial de espera y en cambio espera la cantidad de tiempo...
//... que tú le indiques.
//Éste contador es para cuando se bypassea el tiempo que tienes para usar el servicio, para pruebas + cortas.
let bypass_waitMessage = true; 
let bypass_timer = 60 

//BYPASS LECTOR LISTENING
//Si el valor es true, no esperará el mensaje y te dará uno fake para pruebas. 
//Éstas acciones suceden en numbers.js
let bypass_leer = true; 

//BYPASS COMPRA
//Éste servirá para que se pueda ir a compra exitosa apretando el link de cancelar compra...
//...para poder hacer la compra e ir a la success page sin tener que comprar.
//Cuando no hay bypass compra ni siquiera ponemos dirección de cancelar pq eso favorece al modelo de negocio.
let bypass_compra = true; 