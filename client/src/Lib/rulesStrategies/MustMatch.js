class MustMatch {
    static ruleName = "mustMatch"

    getErrorMessage(placeholder) {
        return `The field must be identical to ${placeholder}`
    }

    validate(value, stringToMatch) {
        const string = stringToMatch.value
        const isEmpty = value == undefined || value.length === 0 
        if(isEmpty) return { isValid: true }

        const isValid = value.trim() === string.trim()
        const rule = MustMatch.ruleName
        const err = this.getErrorMessage(stringToMatch.placeholder)

        return isValid ? { isValid } : { isValid, rule, err }
    }
}

export default MustMatch