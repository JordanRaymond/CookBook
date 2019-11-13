class IsPassword {
    static ruleName = "isPassword"

    getErrorMessage() {
        return 'The password must only contain letters and numbers, at least one uppercase letter and a number.'
    }

    validate(value) {
        const isEmpty = value == undefined || value.length === 0 
        if(isEmpty) return { isValid: true }
        
        const re = /^(?=.*\d)(?=.*[a-z])|(?=.*[A-Z])\S[0-9a-zA-Z]*$/        
        const isValid = re.test(String(value))
        const rule = IsPassword.ruleName
        const err = this.getErrorMessage()

        const error = { infringedRule: rule, message: err }
        return isValid ? { isValid } : { isValid, error }
    }
}

export default IsPassword