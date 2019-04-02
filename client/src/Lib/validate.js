// https://github.com/agoiabel/form_in_react/blob/master

const validate = (value, rules) => {
    let isValid = true
    let errors = []

    for (let rule in rules) {
        switch (rule) {
            case 'isEmail':{
                const isFollowingRule = emailValidator(value)
                if(!isFollowingRule) errors.push('Invalid email format.')

                isValid = isValid && isFollowingRule
                break
            }
            case 'minLength':{
                const isFollowingRule = minLengthValidator(value, rules[rule])
                if(!isFollowingRule) errors.push(`The field must contain at least ${rules[rule]} characters.`)

                isValid = isValid && isFollowingRule
                break
            }
            case 'maxLength':{
                const isFollowingRule = maxLengthValidator(value, rules[rule])
                if(!isFollowingRule) errors.push(`The field can only contain ${rules[rule]} characters.`)                

                isValid = isValid && isFollowingRule
                break
            }
            case 'isRequired': {
                const isFollowingRule = requiredValidator(value)
                if(!isFollowingRule) errors.push('This field is required.')

                isValid = isValid && isFollowingRule
                break
            }
            default: isValid = true
        }
    }

    return { isValid, errors }
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
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(value).toLowerCase())
}

export default validate