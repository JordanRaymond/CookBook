// https://github.com/agoiabel/form_in_react/blob/master

const validate = (value, rules) => {
    let isValid = true
    let errors = []
    const isEmpty = value.length === 0

    for (let rule in rules) {
        switch (rule) {
            case 'isEmail':{
                if(isEmpty) break

                const isFollowingRule = emailValidator(value)
                if(!isFollowingRule) errors.push({rule, message
                    : 'Invalid email format.'} )

                isValid = isValid && isFollowingRule
                break
            }
            case 'isPassword':{
                if(isEmpty) break

                const isFollowingRule = passwordValidator(value)
                if(!isFollowingRule) errors.push({
                    rule, 
                    message: 'The password must only contain letters and numbers, at least one uppercase letter and a number.'
                })

                isValid = isValid && isFollowingRule
                break
            }
            case 'isAlphanumeric':{
                if(isEmpty) break

                const isFollowingRule = alphanumericValidator(value)
                if(!isFollowingRule) errors.push({
                    rule, 
                    message: 'The field must only contain numbers and letters.'
                })

                isValid = isValid && isFollowingRule
                break
            }
            case 'minLength':{
                if(isEmpty) break

                const isFollowingRule = minLengthValidator(value, rules[rule])
                if(!isFollowingRule) errors.push( {rule, message
                    : `The field must contain at least ${rules[rule]} characters.`} )

                isValid = isValid && isFollowingRule
                break
            }
            case 'maxLength':{
                if(isEmpty) break

                const isFollowingRule = maxLengthValidator(value, rules[rule])
                if(!isFollowingRule) errors.push( {rule, message
                    : `The field can only contain ${rules[rule]} characters.`} )                

                isValid = isValid && isFollowingRule
                break
            }
            case 'mustMatch':{
                if(isEmpty) break

                const isFollowingRule = matchValidator(value, rules[rule].value)

                if(!isFollowingRule) errors.push( {rule, message
                    : `The field must be identical to ${rules[rule].placeholder} `} )                

                isValid = isValid && isFollowingRule
                break
            }
            case 'isRequired': {
                const isFollowingRule = requiredValidator(value)
                if(!isFollowingRule) errors.push( {rule, message
                    : 'This field is required.'} )

                isValid = isValid && isFollowingRule
                break
            }
            default: isValid = true
        }
    }

    return { isValid, errors }
}

/**
 *  TODO: separate and create match validator for each type or make a dynamic one
 * @param  value 
 * @param  stringToMatch
 * @return          
 */
const matchValidator = (value, stringToMatch) => {
    return value.trim() === stringToMatch.trim()
}

/**
 * minLength Val
 * @param  value 
 * @param  minLength
 * @return          
 */
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength
}

/**
 * maxLength Val
 * @param  value 
 * @param  minLength
 * @return          
 */
const maxLengthValidator = (value, maxLength) => {
}

/**
 * Check to confirm that feild is required
 * 
 * @param  value 
 * @return       
 */
const requiredValidator = value => {
    return value.trim() !== ''
}

/**
 * Email validation
 * 
 * @param value
 * @return 
 */
const emailValidator = value => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(value).toLowerCase())
}

/**
 * Password validation
 * 
 * @param value
 * @return 
 */
const passwordValidator = value => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S[0-9a-zA-Z]*$/
    return re.test(String(value))
}

/**
 * Alphanumeric validation, check for whitespace too
 * 
 * @param value
 * @return 
 */
const alphanumericValidator = value => {
    const re = /^\S[a-zA-Z0-9]*$/
    return re.test(String(value))
}

export default validate