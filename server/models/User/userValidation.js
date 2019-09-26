function validateEmail(email) {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailReg.test(String(email))
}

function validatePassword(password, passwordConf) {
    if (password.length < 6) {
        return false
    }

    const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S[0-9a-zA-Z]*$/
    if (!passwordReg.test(String(password))) {
        return false
    }

    if (password !== passwordConf) {
        return false
    }

    return true
}

function validateUsername(username) {
    if (username.length < 6) {
        return false
    }

    const isAlphaNumReg = /^\S[a-zA-Z0-9]*$/
    if (!isAlphaNumReg.test(String(username))) {
        return false
    }

    return true
}

function validateUserInputsForm(email, username, password, passwordConf) {
    if (!email || !username || !password || !passwordConf) return false

    return validateEmail(email)
        && validatePassword(password, passwordConf)
        && validateUsername(username)
}

module.exports = validateUserInputsForm