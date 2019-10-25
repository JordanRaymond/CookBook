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

        return isValid ? { isValid } : { isValid, rule, err }
    }
}

export default MaxLength