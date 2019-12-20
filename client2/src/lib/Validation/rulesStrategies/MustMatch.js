class MustMatch {
  static ruleName = "mustMatch"

  constructor(inputNameToMatch) {
    this.inputNameToMatch = inputNameToMatch
  }

  getErrorMessage(placeholder) {
    return `The field must be identical to ${placeholder}`
  }

  /*
        Args should be an object { value: ..., inputName: ...}
        Where value is the value to match and inputName is the name of the 
        input to match (only used for the error message).
    */
  validate(value, args) {
    const string = args["value"]
    const isEmpty = value == undefined || value.length === 0
    if (isEmpty) return { isValid: true }

    const isValid = value.trim() === string.trim()
    const rule = MustMatch.ruleName
    const err = this.getErrorMessage(args["inputName"])

    const error = { infringedRule: rule, message: err }
    return isValid ? { isValid } : { isValid, error }
  }
}

export default MustMatch
