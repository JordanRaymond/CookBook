import React, { Component } from 'react'
import {
    Avatar, Button, FormControl, FormControlLabel, FormHelperText, Checkbox,
    Input, InputLabel, Paper, Typography, withStyles 
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ReactLoading from 'react-loading'
import forms from '../../Lib/forms'
import validate from '../../Lib/validate'
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
  
class Login extends Component {
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
    const { classes } = this.props
    const formControls = this.state.formControls

    const emailHaveErrors = this.checkControlHaveErrors(formControls.email) 
    const passwordHaveErrors = this.checkControlHaveErrors(formControls.password) 

    return (
      <main className={classes.main}>
        <div className={classes.toolbar} />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {this.state.waitingForRes 
                ? <ReactLoading type="bars" color='#3f51b5' className={classes.spinner} />
                : 'Sign in'
              }
            </Typography>

            <form className={classes.form}> 
              <FormControl margin="normal" error={ emailHaveErrors } required fullWidth>
                <InputLabel htmlFor="email" >Email Address</InputLabel>
                <Input 
                  id="email" 
                  name="email" 
                  autoComplete="email" 
                  autoFocus={false} // TODO: if autofocus true and data set by browser and user click outside window, email value would be empty and send error 
                  value={formControls.email.value} 
                  onChange={forms.handleInputChange}
                  onBlur={this.handleInputBlur} 
                  error={ emailHaveErrors }
                  aria-describedby="email-error-text"
                />
                { 
                  this.showErrorsMsg(formControls.email.errors)
                }
              </FormControl>
              <FormControl margin="normal" error={ passwordHaveErrors } required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password" 
                  name="password" 
                  autoComplete="current-password" 
                  type="password" 
                  value={formControls.password.value} 
                  onChange={forms.handleInputChange}
                  onBlur={this.handleInputBlur}
                  error={ passwordHaveErrors }
                  aria-describedby="password-error-text"
                />
                {
                  this.showErrorsMsg(formControls.password.errors)
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

export default withStyles(styles)(Login)