import React from 'react'
import validate from './validate.js'
import { FormHelperText } from '@material-ui/core'

const validateInput = (event, formInputs) => {
    const inputName = event.target.name

    let { updatedFormInputs, updatedFormInput } = createFormCpyAndExtractInput(formInputs, inputName)

    updatedFormInput.touched = true
    
    updatedFormInput = { ...updatedFormInput, ...validate(updatedFormInput.value, updatedFormInput.validationRules) } 
    updatedFormInputs[inputName] = updatedFormInput
    
    return updatedFormInputs
}

const handleInputChange = (event, formInputs) => {
    const inputName = event.target.name
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    const { updatedFormInputs, updatedFormInput } = createFormCpyAndExtractInput(formInputs, inputName)

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
    (errors.length === 1 || error.rule !== 'isRequired') 
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
}