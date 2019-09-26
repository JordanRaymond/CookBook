import React, { Component } from 'react'
import {
    Avatar, Button, FormControl, FormControlLabel, Checkbox,
    Input, InputLabel, Paper, Typography, withStyles, Link 
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ReactLoading from 'react-loading'
import { withSnackbar } from 'notistack'

import forms from '../../Lib/forms'
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

  handleInputBlur = event => {
    const updatedFormInputs = forms.validateInput(event, this.state.formControls)
    const formIsValid = forms.checkFormIsValid(updatedFormInputs)

    this.setState({
      formControls: updatedFormInputs,
      formIsValid
    })
  }

  handleInputChange = event => {
    const updatedFormInputs = forms.handleInputChange(event, this.state.formControls)

    this.setState({
      formControls: updatedFormInputs,
    })
  }

  handleSubmit = async  event => {
    event.preventDefault()
    
    const formInputs = {
      ...this.state.formControls
    }

    const formIsValid = forms.checkFormIsValid(formInputs)

    if(formIsValid) {
      try {
        this.setState({waitingForRes: true})
        const {successful, message} = await login(formInputs.email.value, formInputs.password.value)
        
        if(successful) {
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
          console.log(`Login.js: login err: ${err}`)
        
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

  registerLink = props => <RouterLink to="/register" {...props} />
  
  render() {
    const { classes } = this.props
    const formControls = this.state.formControls

    const emailHaveErrors = forms.checkControlHaveErrors(formControls.email) 
    const passwordHaveErrors = forms.checkControlHaveErrors(formControls.password) 

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
            <Link variant="subtitle2" component={this.registerLink}>
              Don't have an account? Register.
            </Link>
            <form className={classes.form}> 
              <FormControl margin="normal" error={ emailHaveErrors } required fullWidth>
                <InputLabel htmlFor="email" >Email Address</InputLabel>
                <Input 
                  id="email" 
                  name="email" 
                  autoComplete="email" 
                  autoFocus={false} // TODO: if autofocus true and data set by browser and user click outside window, email value would be empty and send error 
                  value={formControls.email.value} 
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputBlur} 
                  error={ emailHaveErrors }
                  aria-describedby="email-error-text"
                />
                { 
                  forms.showErrorsMsg(formControls.email.errors)
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
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputBlur}
                  error={ passwordHaveErrors }
                  aria-describedby="password-error-text"
                />
                {
                  forms.showErrorsMsg(formControls.password.errors)
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
                disabled={!this.state.formIsValid}
              >
                Sign in
              </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

export default withSnackbar(withStyles(styles)(Login))