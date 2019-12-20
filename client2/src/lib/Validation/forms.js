import React from 'react'
import validate from './validate.js'
import { FormHelperText } from '@material-ui/core'

const validateInputs = (formInputs, validator) => {
  let formInputsCpy = { ...formInputs }

  Object.keys(formInputsCpy).forEach(inputName => {
    let inputCopy = validateInput(inputName, formInputs, validator)
    formInputsCpy[inputName] = inputCopy
  })
  
  return formInputsCpy
} 

const validateInput = (inputName, formInputs, validator) => {
  let inputCopy = formInputs[inputName]
  
  inputCopy.touched = true
  
  const result = validator.validate(inputName, inputCopy.value)
  inputCopy = { ...inputCopy, ...extractDataFromResult(result)}
  
  return inputCopy
}

const extractDataFromResult= (result) => {
  let isInputValid = true
  let errors = []

  for (let i in result) {
    let rule = result[i]

    if(!rule.isValid) {
      isInputValid = false
      if(rule.error.infringedRule === "isRequired") {
        errors = [rule.error]
        return { isValid: isInputValid, errors }
      }
  
      errors.push(rule.error)
    }
  }

  return { isValid: isInputValid, errors }
}

const handleInputChange = (event, formInputs) => {
    const inputName = event.target.name
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    const updatedFormInputs = {...formInputs}
    const updatedFormInput = {...formInputs[inputName]} 

    updatedFormInput.value = value
    updatedFormInputs[inputName] = updatedFormInput

    return updatedFormInputs
}

const createFormCpyAndExtractInput = (formInputs, inputName) => ({
  updatedFormInputs:    { ...formInputs },
  updatedFormInput:     { ...formInputs[inputName] },
})

const checkFormIsValid = (formInputs) => {
    let formIsValid = true
    for (let inputIdentifier in formInputs) {
        formIsValid = formInputs[inputIdentifier].isValid && formIsValid
    }

    return formIsValid
}

const showErrorsMsg = errors => (
  errors.map(error => (    
    (errors.length === 1 || error.infringedRule !== 'isRequired') 
    && 
    <FormHelperText id="password-error-text" key={ error.message }>{error.message}</FormHelperText> 
  ))
)

const checkControlHaveErrors = control => (
  control.touched && !control.isValid
)

export default { 
  validateInput, 
  handleInputChange,
  checkFormIsValid, 
  checkControlHaveErrors,
  showErrorsMsg,
  validateInputs 
}