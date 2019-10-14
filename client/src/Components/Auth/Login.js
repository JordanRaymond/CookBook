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

  handleSubmit = async  (event, formInputs) => {
    event.preventDefault()
    
    formInputs = formInputs === undefined ? {
      ...this.state.formControls
    } : formInputs

    const formIsValid = forms.checkFormIsValid(formInputs)

    if(formIsValid) {
      try {
        this.setState({waitingForRes: true})
        const {successful, message, recipes, user} = await login(formInputs.email.value, formInputs.password.value)
        
        if(successful) {
          console.log(this.props)
          this.props.updateAppStates({isAuth: true, recipes: recipes, user: user})
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
    } else {
      this.checkAllInputs()
    }
  }

  checkAllInputs() {
    const updatedFormInputs = forms.validateInputs(this.state.formControls)
    
    this.setState({
      formControls: updatedFormInputs,
    })
  }

  handleKeyDown = (event) => {
    // 13 is the enter key
    if(event.keyCode === 13) {
      const updatedFormInputs = forms.validateInput(event, this.state.formControls)

      this.setState({formControls: updatedFormInputs})

      this.handleSubmit(event, updatedFormInputs)
    }
  }

  formControl = (labelTxt, inputName, doHaveErrors, autoComplete, otherAttributes) => (
    <FormControl margin="normal" error={ doHaveErrors } required fullWidth>
      <InputLabel htmlFor={`${inputName}`}>{labelTxt}</InputLabel>
        <Input 
          id={`${inputName}`} 
          name={`${inputName}`} 
          autoComplete={autoComplete || `${inputName}`} 
          autoFocus={false} // TODO: if autofocus true and data set by browser and user click outside window, email value would be empty and send error 
          value={this.state.formControls[inputName].value} 
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur} 
          error={ doHaveErrors }
          aria-describedby={`${inputName}-error-text`}
          {...otherAttributes}   
        />
        { 
          forms.showErrorsMsg(this.state.formControls[inputName].errors)
        }
    </FormControl>
  )

  registerLink = props => <RouterLink to="/register" {...props} />
  
  render() {
    const { classes } = this.props

    const emailHaveErrors = forms.checkControlHaveErrors(this.state.formControls.email) 
    const passwordHaveErrors = forms.checkControlHaveErrors(this.state.formControls.password) 

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
              {this.formControl('Email Address', 'email', emailHaveErrors)}
              {
                this.formControl('Password', 'password', passwordHaveErrors, 'current-password', {
                  type: 'password', onKeyDown: this.handleKeyDown}
                )
              }
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