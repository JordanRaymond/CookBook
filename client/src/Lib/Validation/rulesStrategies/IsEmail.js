class IsEmail {
    static ruleName = "isEmail"

    getErrorMessage() {
        return 'Invalid email format.'
    }

    validate(value) {
        const isEmpty = value == undefined || value.length === 0 
        if(isEmpty) return { isValid: true }

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const isValid = re.test(String(value).toLowerCase())
        const rule = IsEmail.ruleName
        const err = this.getErrorMessage()

        const error = { infringedRule: rule, message: err }
        return isValid ? { isValid } : { isValid, error }
    }
}

export default IsEmail