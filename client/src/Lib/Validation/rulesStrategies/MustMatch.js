class MustMatch {
    static ruleName = "mustMatch"

    getErrorMessage(placeholder) {
        return `The field must be identical to ${placeholder}`
    }

    validate(value, args) {
        const string = args['value']
        const isEmpty = value == undefined || value.length === 0 
        if(isEmpty) return { isValid: true }

        const isValid = value.trim() === string.trim()
        const rule = MustMatch.ruleName
        const err = this.getErrorMessage(args['inputName'])

        const error = { infringedRule: rule, message: err }
        return isValid ? { isValid } : { isValid, error }
    }
}

export default MustMatch