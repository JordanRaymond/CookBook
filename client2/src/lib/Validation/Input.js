class Input {
  constructor(validationsRules, { dataExtractor } = {}) {
    this.value = ""
    this.placeholder = ""
    this.isValid = false
    this.errors = []
    this.validationsRules = validationsRules
    this.isTouched = false
    this.args = null

    if (dataExtractor) {
      if (dataExtractor.constructor.name !== "RegExp") {
        throw new Error("dataExtractor must be a RegExp.")
      } else {
        this.dataExtractor = dataExtractor
      }
    }
  }

  extractedValue() {
    return this.execDataToValidate()
  }

  validate() {
    let value = this.dataExtractor ? this.execDataToValidate() : this.value
    console.log(value)

    const results = this.validationsRules.map((rule) =>
      rule.validate(value, this.args)
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

  execDataToValidate() {
    let match = this.dataExtractor.exec(this.value)
    let finalString = ""

    if (match) {
      for (let i = 1; i < match.length; i++) {
        finalString += match[i]
      }
    }

    return finalString
  }
}

export default Input
