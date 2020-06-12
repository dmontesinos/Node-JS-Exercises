//Ejercicio 15
o4 = { inc: function() {
  this.count--
  if(this.notify != null) {
    this.notify(this.count);
  }
}, __proto__:o1}; //No lo entiendo. NOTA: Repasar!
