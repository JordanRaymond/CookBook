import Validator from "./Validator"

class FormInputs {
  constructor(inputs) {
    this.formIsValid = false
    this.inputs = inputs
    this.validator = new Validator()

    this.registerRules()
  }

  registerRules() {
    for (let key in this.inputs) {
      this.validator.register(key, this.inputs[key].validationRules)
    }
  }

  input(inputName) {
    return this.inputs[inputName]
  }

  validate() {
    let formIsValid = true
    for (let key in this.inputs) {
      formIsValid = this.inputs[key].isValid && formIsValid
    }

    this.formIsValid = formIsValid
    return formIsValid
  }

  validateAllInputs() {
    for (let input in this.inputs) {
      this.inputs[input].validate()
    }

    this.validate()

    return this.formIsValid
  }

  updateInput(event) {
    this.inputs[event.target.name].updateValue(event)
  }

  doesInputHaveErrors(inputName) {
    return this.inputs[inputName].isTouched && !this.inputs[inputName].isValid
  }
}

export default FormInputs
