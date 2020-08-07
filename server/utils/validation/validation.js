function isValidUrl(url) {
    const urlReg = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
    return urlReg.test(String(url))
}

function isEmpty(val) {
    return (val == null || val == undefined || val.trim().length < 1)    
}

function isObjEmpty(obj) {
    for (var x in obj) { if (obj.hasOwnProperty(x))  return false }
    return true;
 }

function isText(string) {
    const isAlphaNumReg = /^\S[a-zA-Z0-9,.!;? ]*$/
    return isAlphaNumReg.test(String(string).trim())
}

function isAlphaNumeric(string) {
    const isAlphaNumReg = /^[\w-!?.]+([-_ ]{1}[\w.!?]+)*$/
    return isAlphaNumReg.test(String(string).trim())
}

function isFromType(variable, type){
    if (typeof type == 'string') res = (typeof variable == type.toLowerCase())
    else res = (variable.constructor == type)
    return res
}

function isEmail(value) {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailReg.test(String(value))
}

function isPassword(value) {
    const passwordReg = /^(?=.*\d)(?=.*[a-z])|(?=.*[A-Z])\S[0-9a-zA-Z]*$/
    return passwordReg.test(String(value))
}

function hasMinLength(string, length) {
    return String(string).trim().length >= length
}

function hasNotMaxLength(string, length) {
    return String(string).trim() < length
}

module.exports = { 
    isValidUrl, 
    isEmpty, 
    isObjEmpty, 
    isAlphaNumeric, 
    isFromType, 
    isText,
    isEmail,
    isPassword, 
    hasNotMaxLength,
    hasMinLength 
}