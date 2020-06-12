//Ejercicio 1
var f1 = function(a) {
  console.log(a);
}


//Ejercicio 2
//metodo 1
var f2 = function(a) {
  if(a >= 0){
    return a*2;
  } else {
    return -1;
  }
}

//metodo 2
(return a>=0 ? 2*a : -1)


//Ejercicio 3
/*
El map coge elemento a elem de la lista y le aplica la función f2 del ej.
anterior, además de sumarle 23. Posteriormente devolvemos los valores.
*/
var f3 = function(llista) {
  var llista2 = {};
  llista2 = llista.map(elemento => f2(elemento)+23);
  return llista2;
}

//Ejercicio 4
console.printaki = function() {
  console.log("Aqui");
};

//Ejercicio 5
/*
Creamos una funcion f4 que suma 2 valores. Creamos una lista de 4 valores.
En listaB guardamos el resultado de sumarle 23 a cada elemento de llistaA
utilizando la funcion f4 para realizar la suma.
*/
var f4 = function(a,b){
  return a+b;
}
var llistaA = [1,2,3,4];

llistaB = llistaA.map(elemento => f4(elemento,23));



//Ejercicio 6
var f5 = function(a, b, c){
  c(b(a));
}
/*
Prueba -> f5(1, f2, function(valor) {console.log(valor)})
la funcion f2 hace val*2 y C es otra funcion (console.log).
*/

//Ejercicio 7
console.printaki2 = function(){
  count = 0;
  return function(){
    count = count+1;
    console.log('aqui'+count);
  };
}(); //Importante ejecutar la funcion del return!


//Ejercicio 8
fs = require("fs");
lista = ["archivo1.txt","archivo2.txt"];//Lista de ficheros a procesar.


f6 = function(lista, callback_final) { //Pasamos la lista y un callback.
  resultado = []; //Creamos una lista vacía.
  contador = 0; //Inicializamos un contador para identificar la iteración del readFile.
  lista.forEach((fichero, i) => { //Recorremos cada elemento de la lista y creamos un iterador

/*
Leemos el fichero al cual precedemos de la ruta (misma localización que el programa) y ejecutamos
el callback cuando termina de leerlo. Cada vez que llamamos al callback, este añade el contenido
al array de resultados e incrementa el contador en 1, para poder determinar la última iteración
y poder llamar al callback de la función principal (callback_final). Este último callback variará
en función de la función enviada por el usuario.
*/
    fs.readFile("./"+fichero, function(err,contenido){
      resultado.push(contenido+""); //añadimos el nuevo contenido a una posición del array.
      contador++;

      if(contador == lista.length){ //si el contador llega al tamaño de la lista inicial, estamos en la última iteración.
        callback_final(resultado)
      }
    });
  });
};

f6(lista, function(resultado){console.log(resultado)})


// Ej 8 forma 2
lista = ["archivo1.txt","archivo2.txt"];

fs = require("fs");

var f6 = function(llista, callback_final){
	llistaContingut = [];
  counter = 0;
	var callback = function(err,contingut){
			llistaContingut.push(contingut);
			counter ++;

			if (counter == llista.length){
				callback_final(contingut+"");
			}
	}

	llista.forEach (element => fs.readFile(element, callback));
}

f6(lista, function(resultado){console.log(resultado)})


//Ejercicio 9
fs = require("fs");
lista = ["archivo1.txt","archivo2.txt"];

f7 = function(lista, callback_final) {
  resultado = [];
  contador = 0;
  lista.forEach((fichero, i) => {

    fs.readFile("./"+fichero, function(err,contenido){
      /*
      Al utilizar el iterador "i" es posible colocar cada elemento en su posición
      correcta, aunque con un contador se podría haber realizado también.
      */
      resultado[i]=contenido+"";
      contador++;

      if(contador == lista.length){
        callback_final(resultado)
      }
    });
  });
};

f7(lista, function(resultado){console.log(resultado)})


//Ejercicio 10

/*
Si utilizamos el índice que nos proporciona el propio forEach, podemos estar seguros
que ese índice pertenece al elemento que estamos tratando, debido a que van asociados
desde el momento en el que iteramos por ese elemento.
Por otra parte, si creamos el índice nosotros mismos y vamos incrementando el valor
por cada iteración, no podemos garantizar que el elemento tratado dentro de la estructura
sea estrictamente el que toque por orden natural. Es decir, la ejecución de la estructura
no tiene porque ser ordenada y podemos encontrar elementos del array que se adelanten o
desordenen.
*/

//Ejercicio 11

var f6 = function(llista, callback_final) {

}

function asyncMap(list, f, callback2) {
  var list2 = [];
  var counter = 0;
  var totok = 1;

  list.foreach((e, index) => {
    f(e, function(err, res) {
      if(err !== null) {
        if(totok){
          callback2(err, null);
          totok = 0;
        }
      } else {
        list2[index] = f(e);
        counter++;
      }

      if(counter == list.length){
        callback2(null, list2);
      }
    })
  })
}


//esto es lo mismo
f6(l23, function(llista){
  console.log(llista)
});
//que esto
asyncMap(l23, fs.readFile, function(llista) {
  console.log(llista)
});

//Opción 2
function asyncMap(lista, f, callback2){
  lista2 = [];
  contador = 0;
  todoOk = 1;

  lista.forEach((elemento, i) => {
    f(elemento, function(err, res) {
      if(err !== null){
        if(todoOk){
          callback2(err, null);
          todoOk = 0;
        }
      } else {
        lista2[i] = f(elemento);
        contador++;
      }
      if(contador == list.length){
        callback2(null, lista2);
      }
    });
  });
}


//Ejercicio 12
o1 = {
  count: 0,//El contador empezará a cero.
  inc: function(){
    this.count++; //incrementamos el contador.
  //Es importante utilizar el this para hacer referencia a este propio objeto.
  //En caso de que la propiedad notify no sea null, lanzamos la función que contenga.
    if(this.notify != null){
      this.notify();
    }
  },
  //Por defecto en null a menos que enviemos una función por parámetro.
  notify: null
};

//En la función le decimos que imprima el valor de count
o1.count = 1; o1.notify = function() { console.log(this.count) }; o1.inc();
