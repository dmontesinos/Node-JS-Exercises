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

//Ejercicio 13
var o2 = (function() {
  var count = 1;
  var notify = null;
  return {
    inc: function() {
      count++
      if (notify != null) {
        notify(count)
      }
    },
    setNotify: function(a) {
      notify = a;
    }
  };
}());

//Ejercicio 14
function o3 () {
  this.count = 1;
  this.notify = null;
  this.inc = function() {
    this.count++
    if(this.notify != null) {
      this.notify(this.count);
    }
  };
  this.setNotify = function(a) {
    this.notify = a;
  };
}

//Ejercicio 15
o4 = { inc: function() {
  this.count--
  if(this.notify != null) {
    this.notify(this.count);
  }
}, __proto__:o1}; //No lo entiendo. NOTA: Repasar!


//Ejercicio 16
/*
El objeto future empieza en false, el cual cambiará a true cuando se termine
de ejecutar la función que lancemos. Esta función es asíncrona, es decir,
hemos de controlar cuando terminará y eso será gracias al callback, que será
ejecutado cuando dicha función termine.
*/
fs = require("fs");

function readIntoFuture(filename) {
  var future = { isDone: false, result: null };
  fs.readFile(filename, function(err,res){
    future.result = res+''; //concatenamos con string para convertirlo
    future.isDone = true;
  });
  return future;
}
/*
Exemple d’us:
future = readIntoFuture(’a1.txt’); console.log(future)
Resultat:
{ isDone: false, result: null }
Exemple d’us:
future = readIntoFuture(’a1.txt’);
setTimeout(function() { console.log(future) }, 1000)
Resultat:
{ isDone: true, result: ’contingut 1’ }
*/




//Ejercicio 17
/*Generalizamos el ejercicio anterior. Permitimos pasar por parámetro una
función que será ejecutada tal y como se ejecutaba el fs.readFile . En este
caso el programa ejecutará dicha función.*/
function asyncToFuture(funcionRecibida){
  return function readIntoFuture(filename) {
    var future = { isDone: false, result: null };
    //En funcionRecibida almacenamos la función que nos han enviado por param.
    funcionRecibida(filename, function(err, res){
      future.result = res;
      future.isDone = true;
    });
    return future;
  }
}

/*
Ex1:
readIntoFuture2 = asyncToFuture(fs.readFile);
future = readIntoFuture2(’a1.txt’);
setTimeout(function() { console.log(future) }, 1000)
Res: { isDone: true, result: ’contingut 1’ }

Ex2:
statIntoFuture = asyncToFuture(fs.stat);
future = statIntoFuture(’a1.txt’);
setTimeout(function() { console.log(future) }, 1000)
Res: { isDone: true, res : Stats { dev: 64769, mode: 33188, ... } }
*/

//Ejercicio 18
fs = require("fs");

function asyncToEnhancedFuture(f){
  return (filename) => {
    var callback = null;
    var resFuture = {
      isDone: false,
      result: null,
      registerCallback: function(p) {
        if (resFuture.isDone) {
          p(resFuture);
        } else {
          callback = p;
        }
      }
    };

    f(filename, (err, data) => {
      resFuture.result = data;
      resFuture.isDone = true;

      if (callback != null) {
        callback(resFuture);
      }
    });

    return resFuture;
  }
}

//Ejercicio 19
var when = function(f1) {
  return {
    do: function(f2) {
      return f1(f2);
    }
  }
}


//Ejercicio 20
fs = require("fs");

var when = function(fa) {
  return {
    and: function(fb) {
      return {
        do: function(fc) {
          var errf1;
          var errf2;
          var resf1;
          var resf2;

          var halfWay = false;

          fa(function(err1, res1) {
            errf1 = err1;
            resf1 = res1;

            if (halfWay) {
              fc(errf1, errf2, resf1, resf2);
            } else {
              halfWay = true;
            }
          });
          fb(function(err2, res2) {
            errf2 = err2;
            resf2 = res2;

            if (halfWay) {
              fc(errf1, errf2, resf1, resf2);
            } else {
              halfWay = true;
            }
          });
        }
      }
    }
  }
}

//Ejercicio 21
composer = function(f1, f2) {
  return function(p) {
    return f1(f2(p))
  }
}

//Ejercicio 22
asyncComposer = function(f1, f2) {
  return function(a, callback) {
    f2(a, function(err, res) {
      if(err != null) {
        console.log("error");
      } else {
        f1(res, callback);
      }
    })
  }
}



//Ejercicio 23
/*
Ejemplo donde ejecutamos la resolución de la promesa, a la que posteriormente
le sumamos 1 unidad, posteriormente 2 y por último 4, con un resultado de 7.
*/
p = Promise.resolve(0).then(x => x + 1).then(x => x + 2).then(x => x + 4); //a

/*
En este caso rechazamos la promesa, por lo que no ejecutamos el primer .then sino
que ejecutamos el catch, para posteriormente ejecutar el .then que le precede, con
un resultado final de 6. (la unidad del primer .then no se suma porque no llega a
ejecutarse en ningún momento)
*/
p = Promise.reject(0).then(x => x + 1).catch(x => x + 2).then(x => x + 4); //b

/*
Después de realizar el resolve, aplica el primer .then, al igual que el segundo.
Posteriormente, no ejecuta el .catch, debido a que se ha lanzado un resolve, pero
en última instancia si que acaba ejecutando el .then final. Resultado 11.
*/
p = Promise.resolve(0).then(x => x + 1).then(x => x + 2).catch(x => x + 4).then(x => x + 8); //c

/*
Al realizar un reject, el primer then y el segundo no los efectuamos, debido a que
buscamos un catch. Una vez efectuado el catch, lanzamos el último then. Result: 12
*/
p = Promise.reject(0).then(x => x + 1).then(x => x + 2).catch(x => x + 4).then(x => x + 8); //d


/*
Al tratarse de un reject, ejecuta el primer catch que encuentra. //el null no lo entiendo//
*/
p = Promise.reject(0).then(x => x + 1, null).catch(x => x + 2).catch(x => x + 4); //e

//Ejercicio 24
function antipromise(promesaRecibida) {
  return promesaRecibida.then(function(valor) { //Devolvemos el .then de la promesa recibida.
    return Promise.reject(valor); //De esa promesa, si resolve, mandamos primer parámetro
  }, function(valor) { //Sino, devolvemos segundo parámetro (reject)
    return Promise.resolve(valor);
  }); //Ambas respuestas invertidas como pide el enunciado.

};

antipromise(Promise.reject(0)).then(console.log);
antipromise(Promise.resolve(0)).catch(console.log);



//Ejercicio 25
f1 = x => x+1;
f1 = x => Promise.reject(1);

p = Promise.resolve(0);

p.then(f1).catch(f2)

p.then(f1, f2).catch()

var promiseToCallback = function(f) {
  return function(x, callback) {
    f(x).then(res => {
      callback(null, res)
    },
    err => { callback(err, null)}
    )
  }
}

f(x).then(XXX)
g(x, function(err, res) { res= XXX })
g = promiseToCallback(f)

//Ejercicio 26
fs = require("fs");

function readToPromise(archivo) {
  return new Promise(function(resolve, reject) {
    fs.readFile(archivo, function(err, res) {
      if (err == null) {
        resolve(res);
      } else {
        reject(err);
      }
    })
  })
}

//Ejercicio 27
function callbackToPromise(f) {
  return function(p) {
    return new Promise(function(resolve, reject) {
      f(p, function(err, res) {
        if (err == null) {
          resolve(res);
        } else {
          reject(err);
        }
      })
    });
  }
}

//Ejercicio 28

var enhancedFuturetoPromise = function(enhancedFuture) {
  return new Promise(
    (resolve, reject) => {
      enhancedFuture.registerCallback(function(ef) {
        resolve(ef.result);
      })
    }
  );
}

//Ejercicio 29

var mergedPromise = function(p) {
  return new Promise((resolve, reject) => {
    p.then(resolve);
    p.catch(resolve);
  })
}


//Ejercicio 30

//Método corto
var functionPromiseComposer = function(f1, f2) {
  return function(x) {
    return f2(x).then(f1);
  }
}

//Método largo
var functionPromiseComposer = function(f1, f2) {
  var f3 = function(x) {
    return new Promise((resolve, reject) => {
      var p2 = f2(x);

      p2.then(f1).then(y => resolve(y));
    });
  }

  return f3;
}


//Ejercicio 31

var parallelPromise = function(p1, p2) {
  return new Promise((resolve, reject) => {
    var rp1;
    var rp2;

    var halfWay = false;

    p1.then(x => {
      rp1 = x;

      if (halfWay) {
        resolve([rp1, rp2]);
      } else {
        halfWay = true;
      }
    });

    p2.then(x => {
      rp2 = x;
      if(halfWay) {
        resolve([rp1, rp2]);
      } else {
        halfWay = true;
      }
    });
  });
}



//Ejercicio 32

var promiseBarrier = function(n) {
  var list = [];

  var functions = [];
  var params = [];
  var counter = 0;

  for(let i = 0; i< n; i++) {
    list[i] = function(x1) {
      counter++;

      return new Promise ((resolve, reject) => {
        functions[i] = resolve;
        params[i] = x1;

        if(counter == n) {
          for(let j=0; j<n; j++) {
            var r = functions[j];
            r(params[j]);
          }
        }
      });
    }
  }

  return list;
}
