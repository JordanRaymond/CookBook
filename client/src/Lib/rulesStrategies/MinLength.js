class MinLength {
    static ruleName = "minLength"

    getErrorMessage(min) {
        return `The field must contain at least ${min} characters.`
    }

    validate(value, minLength) {
        const isEmpty = value == undefined || value.length === 0 
        if(isEmpty) return { isValid: true }
        
        const isValid = value.length >= minLength
        const rule = MinLength.ruleName
        const err = this.getErrorMessage(minLength)

        return isValid ? { isValid } : { isValid, rule, err }
    }
}

export default MinLength