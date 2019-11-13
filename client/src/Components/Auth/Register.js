import React, { Component } from 'react'
import {
    Avatar, Button, FormControl, FormControlLabel, Checkbox,
    Input, InputLabel, Paper, Typography, withStyles, Link,
    FormHelperText
} from '@material-ui/core'
import { Redirect, Link as RouterLink } from 'react-router-dom'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { withSnackbar } from 'notistack'
import ReactLoading from 'react-loading'

import { register } from '../../Lib/API/api'

import forms from '../../Lib/Validation/forms'

import FormInputs from '../../Lib/Validation/FormInputs'
import FormInput from '../../Lib/Validation/Input'
import { IsRequired, MinLength, IsEmail, 
  IsAlphanumeric, IsPassword, MustMatch } from '../../Lib/Validation/rulesStrategies'

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
          
          formInputs: new FormInputs({
            registrationEmail: new FormInput([new IsRequired(), new IsEmail()]),
            username: new FormInput([new IsRequired(), new IsAlphanumeric(), new MinLength(6)]),
            password: new FormInput([new IsRequired(), new IsPassword(), new MinLength(6)]),
            passwordConfirmation: new FormInput([new IsRequired(), new MustMatch()]),
          }),
        }
    } 

    handleInputBlur = (event, args) => {
      let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
      const inputName = event.target.name
  
      formCopy.input(inputName).validate(args)
      formCopy.input(inputName).isTouched = true
      formCopy.validate()
  
      this.setState({
        formInputs: formCopy
      })
    }
  
    handleInputChange = event => {
      let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
      formCopy.handleInputChange(event) // TODO: rename to updateInput
  
      this.setState({
        formInputs: formCopy,
      })
    }

    handleSubmit = async  event => {
      event.preventDefault()
      
      let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
      const formIsValid = formCopy.validate()

      if(formIsValid) {
        try {
          this.setState({waitingForRes: true})
          const {successful, message, user} = await register(
            formCopy.input('registrationEmail').value,
            formCopy.input('username').value, 
            formCopy.input('password').value,
            formCopy.input('passwordConfirmation').value
          )
          
          if(successful) {
            // this.props.updateAuthState(true)
            this.props.updateAppStates({isAuth: true, user: user})
          } else {
            this.setState({waitingForRes: false, formInputs: formCopy})   

            this.props.enqueueSnackbar(message, {
              variant: 'error',
              persist: true,
              action: (
                  <Button size="small">{'Dismiss'}</Button>
              ),
            })
          }         
        } catch(err) {
          console.log(`Register.js: register err: ${err}`)
          
          this.setState({waitingForRes: false, formInputs: formCopy})            
          this.props.enqueueSnackbar(err.message, {
            variant: 'error',
            persist: true,
            action: (
                <Button size="small">{'Dismiss'}</Button>
            ),
          })
        }
      }else {
        formCopy.validateAllInputs()
        this.setState({formInputs: formCopy})            
      }
    }

    handleKeyDown = (event) => {
      // 13 is the enter key
      if(event.keyCode === 13) {
        let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
        const inputName = event.target.name
  
        formCopy.input(inputName).validate()
  
        this.setState({formInput: formCopy})
  
        this.handleSubmit(event, formCopy)
      }
    }
    
    showErrorsMsg = errors => (
      errors.map(error => (    
        (errors.length === 1 || error.infringedRule !== 'isRequired') 
        && 
        <FormHelperText id="password-error-text" key={ error.message }>{error.message}</FormHelperText> 
      ))
    )

    // setMustMatchRule = () => {
    //     const controls = {
    //         ...this.state.formControls
    //     }
        
    //     controls.passwordConfirmation.validationRules.mustMatch = controls.password
    //     this.setState({formControls: controls}) 
    // }

    loginLink = props => <RouterLink to="/login" {...props} />

    render() {
        const { classes, isAuth } = this.props
        
        const emailHaveErrors = this.state.formInputs.doesInputHaveErrors('registrationEmail')
        const usernameHaveErrors = this.state.formInputs.doesInputHaveErrors('username')
        const passwordHaveErrors = this.state.formInputs.doesInputHaveErrors('password')
        const passwordConfHaveErrors = this.state.formInputs.doesInputHaveErrors('passwordConfirmation')
        
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
                    <Link variant="subtitle2" component={this.loginLink}>
                      Already have an account? Login.
                    </Link>
                    <form className={classes.form}> 
                    <FormControl margin="normal" error={ emailHaveErrors } required fullWidth>
                        <InputLabel htmlFor="registrationEmail" >Email Address</InputLabel>
                        <Input 
                        id="registrationEmail" 
                        name="registrationEmail" 
                        autoFocus={false} // TODO: if autofocus true and data set by browser and user click outside window, email value would be empty and send error 
                        value={this.state.formInputs.input('registrationEmail').value} 
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur} 
                        error={ emailHaveErrors }
                        aria-describedby="registration-email-error-text"
                        />
                        { 
                        this.showErrorsMsg(this.state.formInputs.input('registrationEmail').errors)
                        }
                    </FormControl>
                    <FormControl margin="normal" error={ usernameHaveErrors } required fullWidth>
                        <InputLabel htmlFor="username" >Username</InputLabel>
                        <Input 
                        id="username" 
                        name="username" 
                        autoFocus={false}  
                        value={this.state.formInputs.input('username').value} 
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur} 
                        error={ usernameHaveErrors }
                        aria-describedby="username-error-text"
                        />
                        { 
                        forms.showErrorsMsg(this.state.formInputs.input('username').errors)
                        }
                    </FormControl>
                    <FormControl margin="normal" error={ passwordHaveErrors } required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                        id="password" 
                        name="password" 
                        autoComplete="new-password"
                        type="password" 
                        value={this.state.formInputs.input('password').value} 
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur}
                        error={ passwordHaveErrors }
                        aria-describedby="password-error-text"
                        />
                        {
                        forms.showErrorsMsg(this.state.formInputs.input('password').errors)
                        }
                    </FormControl>
                    <FormControl margin="normal" error={ passwordConfHaveErrors } required fullWidth>
                        <InputLabel htmlFor="passwordConfirmation">Password confirmation</InputLabel>
                        <Input
                        id="passwordConfirmation" 
                        name="passwordConfirmation" 
                        type="password" 
                        value={this.state.formInputs.input('passwordConfirmation').value} 
                        onChange={this.handleInputChange}
                        onBlur={(event) => {this.handleInputBlur(event, {value: this.state.formInputs.input('password').value, inputName: 'password'})}}
                        error={ passwordConfHaveErrors }
                        aria-describedby="passwordConfirmation-error-text"
                        onKeyDown={this.handleKeyDown}
                        />
                        {
                        forms.showErrorsMsg(this.state.formInputs.input('passwordConfirmation').errors)
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
                        disabled={!this.state.formInputs.formIsValid}
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