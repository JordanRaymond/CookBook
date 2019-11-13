class MaxLength {
    static ruleName = "maxLength"

    getErrorMessage(max) {
        return `The field can only contain ${max} characters.`
    }

    validate(value, maxLength) {
        const isEmpty = value == undefined || value.length === 0 
        if(isEmpty) return { isValid: true }
        
        const isValid = value.length <= maxLength
        const rule = MaxLength.ruleName
        const err = this.getErrorMessage(maxLength)

        const error = { infringedRule: rule, message: err }
        return isValid ? { isValid } : { isValid, error }
    }
}

export default MaxLength