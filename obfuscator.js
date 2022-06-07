function obfusMessage(mensaje_original) { 

    //Obten la posición hasta donde no querrías eliminar el número porque ese no es el deseado.
    let position = mensaje_original.search("]");
    console.log("Ésta es la position...");
    console.log(position);

    //Si position es -1 significa que no ésta presente ese caractér.
    //Y por lo tanto no existe el caso. 
    //De ser aasí podría haber varios números presentes, usemos siempre el último.
    
    //Ahora que haz definido la posición vas a crear dos strings separados.
    //Creo que no necesitas dividir basado en [] si te basas en que el último número es el código.
    //Por lo tanto comentaré lo que dependa de [], pero lo dejaré por si las reglas cambian.
    
    /* let parte1 = mensaje_original.substring(0, position+1);
    console.log("Ésto es la parte 1:");
    console.log(parte1);
    let parte2 = mensaje_original.substring(position+1);
    console.log("Ésto es la parte 2:");
    console.log(parte2); */

    //Si regresas a la vida ésta parte comentada de arriba...
    //no olvides renombrar ahí todos los mensaje_original por parte2.

    //Ahora trabajaremos con la parte dos, para encontrar el código.
    
    matches = mensaje_original.match(/\d+/g); 

    console.log("Estos son los números de la parte2...")
    console.log(matches)

    console.log("Esto es lenght.matches...")
    longitud = matches.length;
    console.log(longitud);
    //El resultado esperado es 1, porque esperamos que no haya más números sueltos en ese mensaje. 

    console.log("Éste es el número que queremos ocultar...");
    console.log(matches[longitud-1]);
    ocultar = matches[longitud-1];
    console.log("Éstos son la cantidad de caractéres que tiene dicho número...");
    console.log(matches[longitud-1].length);
    
    //Crearemos un string que con esa cantidad de asteriscos cubra al número. 
    let asterisco = "*";
    let asteriscos="";

    for (let i = 0; i < matches[0].length; i++) {
        console.log("Entré a la vuelta:" +i);
        asteriscos = asteriscos.concat(asterisco);
        console.log(asteriscos);
      }
        
    console.log("Éstos son los asteriscos unidos...");
    console.log(asteriscos);

    //Ahora hagamos un replace de los números por el asterisco: 
    console.log("Éste es el texto de l parte 2, original:");
    console.log(mensaje_original);
    let  mensaje_obfuscado = mensaje_original.replace(ocultar, asteriscos);
   
    //Ahora unimos la parte1 con la nueva parte2 (result).

    //mensaje_obfuscado = parte1.concat(sustituto_parte2);
    console.log("Éste es el mensaje obfuscado:");
    console.log(mensaje_obfuscado);

    return mensaje_obfuscado;
        
} 