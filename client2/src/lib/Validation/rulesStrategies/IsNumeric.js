class IsNumeric {
  static ruleName = "isNumeric"

  getErrorMessage() {
    return "The field must only contain numbers."
  }

  // TODO include
  validate(value, options = {}) {
    const isEmpty = value == undefined || value.length === 0
    if (isEmpty) return { isValid: true }

    const re = /^\d+$/g
    const isValid = re.test(String(value))

    const rule = IsNumeric.ruleName
    const err = this.getErrorMessage()

    const error = { infringedRule: rule, message: err }
    return isValid ? { isValid } : { isValid, error }
  }
}

export default IsNumeric
