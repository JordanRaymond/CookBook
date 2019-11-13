class Validator {
    constructor() {
      this.rules = {}
    }
  
    register(key, rules) {
      this.rules[key] = rules
    }
  
    validate(key, value, args) {
      const result = this.rules[key].map(
          item => item.validate(value, args)
        )

      return result
    }
  }
  
  export default Validator
  