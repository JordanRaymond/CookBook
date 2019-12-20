class IsPassword {
  static ruleName = "isPassword"

  getErrorMessage() {
    return "The password must only contains letters, one uppercase, one number and a special charater."
  }

  validate(value) {
    const isEmpty = value == undefined || value.length === 0
    if (isEmpty) return { isValid: true }

    const re = /^(?=\S.*[\w])(?=.*[\W])[\w\W]\S*$/
    const isValid = re.test(String(value))
    const rule = IsPassword.ruleName
    const err = this.getErrorMessage()

    const error = { infringedRule: rule, message: err }
    return isValid ? { isValid } : { isValid, error }
  }
}

export default IsPassword
