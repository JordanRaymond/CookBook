class IsRequired {
    static ruleName = "isRequired"

    getErrorMessage() {
        return 'This field is required.'
    }

    validate(value) {
        const isValid = value !== undefined && value.trim() !== ''
        const rule = IsRequired.ruleName
        const err = this.getErrorMessage()

        return isValid ? { isValid } : { isValid, rule, err }
    }
}

export default IsRequired