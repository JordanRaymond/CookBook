const { isAlphaNumeric, isEmail, hasMinLength, isPassword} = require('./validation')

function validateEmail(email) {
    return isEmail(email)
}

function validatePassword(password, passwordConf) {
    if (!hasMinLength(password, 6)) return false

    if (!isPassword(password)) return false

    if (password !== passwordConf) {
        return false
    }

    return true
}

function validateUsername(username) {
    if (!hasMinLength(username, 6)) return false

    if (!isAlphaNumeric(username)) return false

    return true
}

function validateUserInputsForm(email, username, password, passwordConf) {
    if (!email || !username || !password || !passwordConf) return false
    console.log(`email: ${validateEmail(email)}`)
    console.log(`username: ${validateUsername(username)}`)    
    console.log(`password: ${validatePassword(password, passwordConf)}`)
    
    return validateEmail(email)
        && validatePassword(password, passwordConf)
        && validateUsername(username)
}

module.exports = validateUserInputsForm