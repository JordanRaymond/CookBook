// import RulesManager from './RulesManager'

// function validate(value, rules) {
//     let isFormValid = true
//     let errors = []

//     const rulesManager = new RulesManager()
//     rulesManager.init()

//     for (let rule in rules) {
//         let { isValid, err } = rulesManager.invoke(rule, value, rules[rule])

//         if(!isValid) {
//             errors.push({
//                 rule,
//                 message: err
//             })
//         }

//         isFormValid = isFormValid && isValid
//     }
    
//     return { isValid: isFormValid, errors }
// } 
import Validator from './Validator'

function validate(value, rules) {
    let isFormValid = true
    let errors = []

    const validator = new Validator()

    for (let rule in rules) {
        let { isValid, err } = validator.invoke(rule, value, rules[rule])

        if(!isValid) {
            errors.push({
                rule,
                message: err
            })
        }

        isFormValid = isFormValid && isValid
    }
    
    return { isValid: isFormValid, errors }
} 

export default validate