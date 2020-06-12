// Preparació de PAUL5.js

const fs = require('fs');

//Problema 23
console.log("Problema 23 - Exemples:  ->  ");
var p1 = Promise.resolve(0).then(x => x + 1).then(x => x + 2).then(x => x + 4);
p1.then(x => console.log("p1: " + x + " -- Com que s'accepta la promesa i tots són .then, tots s'executen"));

var p2 = Promise.reject(0).then(x => x + 1).catch(x => x + 2).then(x => x + 4);
p2.then(x => console.log("p2: " + x + " -- Com que refusa la promesa es continua l'execució a partir del .catch"));

var p3 = Promise.resolve(0).then(x => x + 1).then(x => x + 2).catch(x => x + 4).then(x => x + 8);
p3.then(x => console.log("p3: " + x + " -- Com que s'accepta la promesa s'executen tots els .then, però no el .catch"));

var p4 = Promise.reject(0).then(x => x + 1).then(x => x + 2).catch(x => x + 4).then(x => x + 8);
p4.then(x => console.log("p4: " + x + " -- Com que refusa la promesa es continua l'execució a partir del .catch"));

var p5 = Promise.reject(0).then(x => x + 1, null).catch(x => x + 2).catch(x => x + 4);
p5.then(x => console.log("p5: " + x + " -- Com que es refusa la promesa s'executa el primer .catch i ja no hi ha més .then"));

//Problema 24
console.log("Problema 24 - Exemple:  ->  ");
var antipromise = function(prom) {

  return prom.then(function(value) {
    return Promise.reject(value);
  }, function(value) {
    return Promise.resolve(value);
  });

}

antipromise(Promise.reject(0)).then(console.log);
antipromise(Promise.resolve(0)).catch(console.log);


//Problema 25
var promiseToCallback = function(f) {

  return function(x, callback) {
    f(x).then(res => {
      callback(null, res)
    }, err => {
      callback(err, null)
    });
  }
}

console.log("Problema 25 - Exemple:  ->  ");
var isEven = x => new Promise(
  (resolve, reject) => x % 2 ? reject(x) : resolve(x)
);
var isEvenCallback = promiseToCallback(isEven);
isEven(2).then(() => console.log("OK"), () => console.log("KO"));
isEvenCallback(2, (err, res) => console.log(err, res));
isEven(3).then(() => console.log("OK"), () => console.log("KO"));
isEvenCallback(3, (err, res) => console.log(err, res));

//Problema 26

function readToPromise(filename) {

  return new Promise(function(resolve, reject) {
    fs.readFile(filename, function(err, res) {
      if (err === null) {
        resolve(res);
      } else {
        reject(err);
      }
    })

  });
}

console.log("Problema 26 - Exemple:  ->  ");
readToPromise("a1.txt").then(x => console.log("Contents: ", x)).catch(x => console.log("Error: ", x));
readToPromise("notfound.txt").then(x => console.log("Contents: ", x)).catch(x => console.log("Error: ", x));

//Problema 27
function callbackToPromise(f) {
  return function(p) {
    return new Promise(function(resolve, reject) {
      f(p, function(err, res) {
        if (err === null) {
          resolve(res);
        } else {
          reject(err);
        }
      })
    })
  }
}

console.log("Problema 27 - Exemple:  ->  ");
var readToPromise2 = callbackToPromise(fs.readFile);
readToPromise2("a1.txt").then(x => console.log("Contents: ", x)).catch(x => console.log("Error: ", x));


//Problema 28
function enhancedFuturetoPromise(enhFuture) {
  enhFuture.registerCallback = function(call) {
    if (this.isDone === true) {
      call();
      return Promise.resolve(enhFuture.result);
    }
  }
}

//Problema 29
var mergedPromise = function(prom1) {
  var n_f = function(value) {
    return new Promise(function(resolve, reject) {
      resolve(value);
    })
  }
  return prom1.then(function(value) {
    return n_f(value);
  }, function(value) {
    return n_f(value);
  });
}

console.log("Problema 29 - Exemple:  ->  ");
var mp1 = mergedPromise(Promise.resolve(0)).then(console.log);
var mp2 = mergedPromise(Promise.reject(1)).then(console.log);


//Problema 30
var functionPromiseComposer = function(f1, f2) {
  return function(x) {
    return f2(x).then(f1);
  }
}

console.log("Problema 30 - Exemple:  ->  ");

var f1 = x => new Promise((resolve, reject) => resolve(x + 1));
functionPromiseComposer(f1, f1)(3).then(console.log);

var f3 = x => new Promise((resolve, reject) => reject('always fails'));
functionPromiseComposer(f1, f3)(3).catch(console.log);


//Problema 31
var parallelPromise = function(prom1, prom2) {
  var list = [];
  prom1.then(x => list.push(x));
  prom2.then(x => list.push(x));

  return new Promise(function(resolve, reject) {
    resolve(list);
  })
}

console.log("Problema 31 - Exemple:  ->  ");
var p2 = parallelPromise(Promise.resolve(0), Promise.resolve(1));
p2.then(console.log);

//Problema 32

var promiseBarrier = function(n) {

  var globalList = [];

  var count = 0;
  var functionParams = [];
  var functionList = [];

  for (let i = 0; i < n; i++) {
    globalList[i] = function(p1) {

      count++;

      return new Promise(function(resolve, reject) {
        functionList[i] = resolve;
        functionParams[i] = p1;

        if (count === n) {
          for (let j = 0; j < count; j++) {
            functionList[j](functionParams[j]);
          }
        }

      });

    }
  }

  return globalList;
}

console.log("Problema 32 - Exemple:  ->  ");

var [f1, f2, f3] = promiseBarrier(3);
Promise.resolve(0)
  .then(x => {
    console.log("c1 s1");
    return x;
  })
  .then(x => {
    console.log("c1 s2");
    return x;
  })
  .then(x => {
    console.log("c1 s3");
    return x;
  })
  .then(f1)
  .then(x => {
    console.log("c1 s4");
    return x;
  })
Promise.resolve(0)
  .then(x => {
    console.log("c2 s1");
    return x;
  })
  .then(f2)
  .then(x => {
    console.log("c2 s2");
    return x;
  })
Promise.resolve(0)
  .then(f3)
  .then(x => {
    console.log("c3 s1");
    return x;
  })
  .then(x => {
    console.log("c3 s2");
    return x;
  })
  .then(x => {
    console.log("c3 s3");
    return x;
  })




//