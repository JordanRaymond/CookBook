import validate from './validate.js'

// Validation 
const handleInputBlur = event => {
    const name = event.target.name

    const updatedControls = {
      ...this.state.formControls
    }

    let updatedFormElement = {
      ...updatedControls[name]
    }
    updatedFormElement.touched = true
    
    updatedFormElement = { ...updatedFormElement, ...validate(updatedFormElement.value, updatedFormElement.validationRules) } 
    updatedControls[name] = updatedFormElement
    
    console.log(updatedControls)
    this.setState({
      formControls: updatedControls
    })
    
    checkFormIsValid(updatedControls)
}

function handleInputChange(event) {
    const name = event.target.name
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    const updatedControls = {
      ...this.state.formControls
    }

    const updatedFormElement = {
      ...updatedControls[name]
    }

    updatedFormElement.value = value
    updatedControls[name] = updatedFormElement
    console.log('here')
    this.setState({
      formControls: updatedControls,
    })
}

function checkFormIsValid(updatedControls) {
    const controls = updatedControls ? updatedControls : {
        ...this.state.formControls
    }

    let formIsValid = true
    for (let inputIdentifier in controls) {
        formIsValid = controls[inputIdentifier].isValid && formIsValid
    }

    this.setState({formIsValid})
}

export default { handleInputBlur, handleInputChange }