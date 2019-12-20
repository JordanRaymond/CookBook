class MinLength {
    static ruleName = "minLength"

    constructor(minLength) {
        this.minLength = minLength
    }

    getErrorMessage() {
        return `The field must contain at least ${this.minLength} characters.`
    }

    validate(value) {
        const isEmpty = value == undefined || value.length === 0 
        if(isEmpty) return { isValid: true }
        
        const isValid = value.length >= this.minLength
        const rule = MinLength.ruleName
        const err = this.getErrorMessage()

        const error = { infringedRule: rule, message: err }
        return isValid ? { isValid } : { isValid, error }
    }
}

export default MinLength