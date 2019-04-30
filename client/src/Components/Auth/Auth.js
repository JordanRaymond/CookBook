import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
      Avatar, Button, FormControl, FormControlLabel, FormHelperText, Checkbox,
      Input, InputLabel, Paper, Typography, withStyles 
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { withRouter, Redirect } from 'react-router-dom' 
import { withSnackbar } from 'notistack'
import ReactLoading from 'react-loading'

import validate from '../../Lib/validate.js'
import forms from '../../Lib/forms'
import { login } from '../../Lib/API/api'

import Login from './Login'

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
          isAuth: props.isAuth,
          waitingForRes: false,
          formIsValid: false,

          formControls: {
            email: {
              value: '',
              placeholder: '',
              isValid: false,
              errors: [],
              validationRules: {
                isRequired: true,
                isEmail: true
              },
              touched: false
            },
            password: {
              value: '',
              placeholder: '',
              isValid: false,
              errors: [],
              validationRules: {
                isRequired: true,
                minLength: 6
              },
              touched: false
            },
          }
        }

    } 

    // Validation 
    handleInputBlur = event => {
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

      this.setState({
        formControls: updatedControls
      })
    }

    handleInputChange = event => {
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

      this.setState({
        formControls: updatedControls,
      })
    }

    handleSubmit = async  event => {
      event.preventDefault()
      
      const controls = {
        ...this.state.formControls
      }

      let formIsValid = true
      for (let inputIdentifier in controls) {
        formIsValid = controls[inputIdentifier].isValid && formIsValid
      }

      if(formIsValid) {
        try {
          this.setState({waitingForRes: true})
          const {successful, message} = await login(controls.email.value, controls.password.value)
          
          if(successful) {
            this.props.history.push('/')
            this.props.updateAuthState(true)
          } else {
            this.setState({waitingForRes: false})   

            this.props.enqueueSnackbar(message, {
              variant: 'error',
              persist: true,
              action: (
                  <Button size="small">{'Dismiss'}</Button>
              ),
            })
          }         
        } catch(err) {
          console.log(`Auth.js: login err: ${err}`)
          
          this.setState({waitingForRes: false})            
          this.props.enqueueSnackbar(err.message, {
            variant: 'error',
            persist: true,
            action: (
                <Button size="small">{'Dismiss'}</Button>
            ),
          })
        }
      }
    }
    
    showErrorsMsg = errors => (
      errors.map(error => (
        (errors.length === 1 || error.rule !== 'isRequired') 
        && 
        <FormHelperText id="password-error-text" key={ error.message }>{error.message}</FormHelperText> 
      ))
    )

    checkControlHaveErrors = control => (
      control.touched && !control.isValid
    )
  

  render() {
    const { isAuth } = this.props

    console.log(`Auth isAuth: ${isAuth} ${window.location}`)
    
    return (
        isAuth === true ? <Redirect to="/" exact /> :      
        <Login />
      )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withSnackbar(withRouter(SignIn))