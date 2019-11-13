class IsRequired {
    static ruleName = "isRequired"

    getErrorMessage() {
        return 'This field is required.'
    }

    validate(value) {
        const isValid = value !== undefined && value.trim() !== ''
        const rule = IsRequired.ruleName
        const err = this.getErrorMessage()

        const error = { infringedRule: rule, message: err }
        return isValid ? { isValid } : { isValid, error }
    }
}

export default IsRequired