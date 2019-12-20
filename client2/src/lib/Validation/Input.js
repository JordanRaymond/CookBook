class Input {
  constructor(validationsRules, defaultValue = "") {
    this.value = defaultValue
    this.placeholder = ""
    this.isValid = false
    this.errors = []
    this.validationsRules = validationsRules
    this.isTouched = false
    this.args = null
  }

  validate() {
    const results = this.validationsRules.map(rule =>
      rule.validate(this.value, this.args)
    )

    const { isValid, errors } = this.extractDataFromResult(results)
    this.isValid = isValid
    this.errors = errors

    return isValid
  }

  updateValue(event) {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    this.value = value
  }

  extractDataFromResult(results) {
    let isInputValid = true
    let errors = []

    for (let i in results) {
      let result = results[i]

      if (!result.isValid) {
        isInputValid = false

        if (result.error.infringedRule === "isRequired") {
          errors = [result.error]
          return { isValid: isInputValid, errors }
        }

        errors.push(result.error)
      }
    }

    return { isValid: isInputValid, errors }
  }

  haveErrors() {
    return this.isTouched && !this.isValid
  }
}

export default Input
