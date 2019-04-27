import React, { Component } from 'react'
import {
    Avatar, Button, FormControl, FormControlLabel, FormHelperText, Checkbox,
    Input, InputLabel, Paper, Typography, withStyles
} from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { withRouter, Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import ReactLoading from 'react-loading'

import validate from '../../Lib/validate.js'
import { register, login } from '../../Lib/API/api'

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
  
})

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
          isAuth: props.isAuth,
          waitingForRes: false,
          formIsValid: false,
          
          formControls: {
            registrationEmail: {
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
            username: {
                value: '',
                placeholder: '',
                isValid: false,
                errors: [],
                validationRules: {
                  isRequired: true,
                  isAlphanumeric: true,   
                  minLength: 6
                },
                touched: false
            },
            password: {
              value: '',
              placeholder: 'Password',
              isValid: false,
              errors: [],
              validationRules: {
                isRequired: true,
                isPassword: true,   
                minLength: 6
              },
              touched: false
            },
            passwordConfirmation: {
                value: '',
                placeholder: '',
                isValid: false,
                errors: [],
                validationRules: {
                  isRequired: true,
                  mustMatch: undefined
                },
                touched: false
            }
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
      
      this.checkFormIsValid(updatedControls)
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

    checkFormIsValid = (updatedControls) => {
        const controls = updatedControls ? updatedControls : {
            ...this.state.formControls
        }
    
        let formIsValid = true
        for (let inputIdentifier in controls) {
            formIsValid = controls[inputIdentifier].isValid && formIsValid
        }

        this.setState({formIsValid})
    }

    handleSubmit = async  event => {
      event.preventDefault()
      
      const controls = {
        ...this.state.formControls
      }

      this.checkFormIsValid()

      if(this.state.formIsValid) {
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
        <FormHelperText id="username-error-text" key={ error.message }>{error.message}</FormHelperText> // TODO: fix id
      ))
    )
    
    checkControlHaveErrors = control => (
        control.touched && !control.isValid
    )
    
    setMustMatchRule = () => {
        const controls = {
            ...this.state.formControls
        }
        
        controls.passwordConfirmation.validationRules.mustMatch = controls.password
        this.setState({formControls: controls}) 
    }

    render() {
        const { classes, isAuth } = this.props
        
        const doesEmailHaveErrors = this.checkControlHaveErrors(this.state.formControls.registrationEmail) 
        const doesPasswordHaveErrors = this.checkControlHaveErrors(this.state.formControls.password)
        const doesPasswordConHaveErrors = this.checkControlHaveErrors(this.state.formControls.passwordConfirmation)
        const doesUsernameHaveErrors = this.checkControlHaveErrors(this.state.formControls.username)
        

        console.log(`Register isAuth: ${isAuth} ${window.location}`)
        
        return (
            isAuth === true ? <Redirect to="/" exact /> :              
            <main className={classes.main}>
                <div className={classes.toolbar} />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    {this.state.waitingForRes 
                        ? <ReactLoading type="bars" color='#3f51b5' className={classes.spinner} />
                        : 'Register'
                    }
                    </Typography>

                    <form className={classes.form}> 
                    <FormControl margin="normal" error={ doesEmailHaveErrors } required fullWidth>
                        <InputLabel htmlFor="registrationEmail" >Email Address</InputLabel>
                        <Input 
                        id="registrationEmail" 
                        name="registrationEmail" 
                        autoFocus={false} // TODO: if autofocus true and data set by browser and user click outside window, email value would be empty and send error 
                        value={this.state.formControls.registrationEmail.value} 
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur} 
                        error={ doesEmailHaveErrors }
                        aria-describedby="registration-email-error-text"
                        />
                        { 
                        this.showErrorsMsg(this.state.formControls.registrationEmail.errors)
                        }
                    </FormControl>
                    <FormControl margin="normal" error={ doesUsernameHaveErrors } required fullWidth>
                        <InputLabel htmlFor="username" >Username</InputLabel>
                        <Input 
                        id="username" 
                        name="username" 
                        autoFocus={false}  
                        value={this.state.formControls.username.value} 
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur} 
                        error={ doesUsernameHaveErrors }
                        aria-describedby="username-error-text"
                        />
                        { 
                        this.showErrorsMsg(this.state.formControls.username.errors)
                        }
                    </FormControl>
                    <FormControl margin="normal" error={ doesPasswordHaveErrors } required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                        id="password" 
                        name="password" 
                        autoComplete="new-password"
                        type="password" 
                        value={this.state.formControls.password.value} 
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur}
                        error={ doesPasswordHaveErrors }
                        aria-describedby="password-error-text"
                        />
                        {
                        this.showErrorsMsg(this.state.formControls.password.errors)
                        }
                    </FormControl>
                    <FormControl margin="normal" error={ doesPasswordConHaveErrors } required fullWidth>
                        <InputLabel htmlFor="passwordConfirmation">Password confirmation</InputLabel>
                        <Input
                        id="passwordConfirmation" 
                        name="passwordConfirmation" 
                        type="password" 
                        value={this.state.formControls.passwordConfirmation.value} 
                        onChange={this.handleInputChange}
                        onBlur={(event) => {this.setMustMatchRule(); this.handleInputBlur(event)}}
                        error={ doesPasswordConHaveErrors }
                        aria-describedby="passwordConfirmation-error-text"
                        />
                        {
                        this.showErrorsMsg(this.state.formControls.passwordConfirmation.errors)
                        }
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Accept"
                    />
                    <Button
                        onClick={this.handleSubmit}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!this.state.formIsValid}
                    >
                        Register
                    </Button>
                    </form>
                </Paper>
            </main>
        )
    }
}

export default withSnackbar(withStyles(styles)(Register))