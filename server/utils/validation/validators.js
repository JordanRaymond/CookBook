 
class Validator {
    constructor() {
      this.value = 0;
    }
    get val() {
      return this.value;
    }
    sum(...args) {
      this.value = args.reduce((sum, current) => sum + current, 0);
      return this;
    }
    add(value) {
      this.value += value;
      return this;
    }
    subtract(value) {
      this.value -= value;
      return this;
    }
    average(...args) {
      this.value = args.length
        ? (this.sum(...args).value) / args.length
        : undefined;
      return this;
    }
  }

  a = new Arithmetic()
a.sum(1, 3, 6)   // => { value: 10 } 
  .subtract(3)   // => { value: 7 }
  .add(4)        // => { value: 11 }
  .val 