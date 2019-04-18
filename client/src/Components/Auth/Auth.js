import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
      Avatar, Button, FormControl, FormControlLabel, FormHelperText, Checkbox,
      Input, InputLabel, Paper, Typography, withStyles 
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { withRouter, Redirect } from 'react-router-dom' 
import { withSnackbar } from 'notistack';
import validate from '../../Lib/validate.js'
import { login } from '../../Lib/API/api'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
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

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
          isAuth: props.isAuth,
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
          const {successful, message} = await login(controls.email.value, controls.password.value)
          if(successful) this.props.updateAuthState(true)
          else {
            this.props.enqueueSnackbar(message, {
              variant: 'error',
              persist: true,
              action: (
                  <Button size="small">{'Dismiss'}</Button>
              ),
            })
          }
          // window.alert(message)
        } catch(err) {
          console.log(err)
        }
      }
      // TODO API submit and Show server errors msg 
    }
    
    showErrorsMsg = errors => (
      errors.map(error => (
        (errors.length === 1 || error.rule !== 'isRequired') 
        && 
        <FormHelperText id="password-error-text" key={ error.msg }>{error.msg}</FormHelperText> 
      ))
    )

  render() {
    const { classes, isAuth } = this.props

    let isEmailValid = this.state.formControls.email.touched && !this.state.formControls.email.isValid
    let isPasswordValid = this.state.formControls.password.touched && !this.state.formControls.password.isValid
    console.log(`Auth isAuth: ${isAuth} ${window.location}`)
    
    return (
        isAuth === true ? <Redirect to="/" exact /> :      
        <main className={classes.main}>
          <div className={classes.toolbar} />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form className={classes.form}> 
              <FormControl margin="normal" error={ isEmailValid } required fullWidth>
                <InputLabel htmlFor="email" >Email Address</InputLabel>
                <Input 
                  id="email" 
                  name="email" 
                  autoComplete="email" 
                  autoFocus={false} // TODO: if autofocus true and data set by browser and user click outside window, email value would be empty and send error 
                  value={this.state.formControls.email.value} 
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputBlur} 
                  error={ isEmailValid }
                  aria-describedby="email-error-text"
                />
                { 
                  this.showErrorsMsg(this.state.formControls.email.errors)
                }
              </FormControl>
              <FormControl margin="normal" error={ isPasswordValid } required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password" 
                  name="password" 
                  autoComplete="current-password" 
                  type="password" 
                  value={this.state.formControls.password.value} 
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputBlur}
                  error={ isPasswordValid }
                  aria-describedby="password-error-text"
                />
                {
                  this.showErrorsMsg(this.state.formControls.password.errors)
                }
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                onClick={this.handleSubmit}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      )
  }

}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withSnackbar(withRouter(withStyles(styles)(SignIn)))