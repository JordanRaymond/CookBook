import React, { Component } from 'react'
import {
  Avatar, Button, FormControl, FormControlLabel, Checkbox,
  Input, InputLabel, Paper, Typography, withStyles, Link, FormHelperText
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ReactLoading from 'react-loading'
import { withSnackbar } from 'notistack'

import { login } from '../../Lib/API/api'

import FormInputs from '../../Lib/Validation/FormInputs'
import FormInput from '../../Lib/Validation/Input'
import { IsRequired, MinLength, IsEmail } from '../../Lib/Validation/rulesStrategies'

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

      formInputs: new FormInputs({
        email: new FormInput([new IsRequired(), new IsEmail()]),
        password: new FormInput([new IsRequired(), new MinLength(6)])
      })
    }
  }

  handleInputChange = event => {
    let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
    formCopy.handleInputChange(event) // TODO: rename to updateInput

    this.setState({
      formInputs: formCopy,
    })
  }

  handleInputBlur = event => {
    let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
    const inputName = event.target.name

    formCopy.input(inputName).validate()
    formCopy.input(inputName).isTouched = true
    formCopy.validate()

    this.setState({
      formInputs: formCopy
    })
  }

  handleSubmit = async (event, formInputs) => {
    event.preventDefault()

    let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
    const formIsValid = formCopy.validate()

    if (formIsValid) {
      try {
        this.setState({ waitingForRes: true })
        const { successful, message, user } = await login(formCopy.input("email").value, formCopy.input("password").value)

        if (successful) {
          this.props.updateAppStates({ isAuth: true, user: user })
        } else {
          this.setState({ waitingForRes: false, formInputs: formCopy })

          this.props.enqueueSnackbar(message, {
            variant: 'error',
            persist: true,
            action: (
              <Button size="small">{'Dismiss'}</Button>
            ),
          })
        }
      } catch (err) {
        console.log(`Login.js: login err: ${err}`)

        this.setState({ waitingForRes: false, formInputs: formCopy })
        this.props.enqueueSnackbar(err.message, {
          variant: 'error',
          persist: true,
          action: (
            <Button size="small">{'Dismiss'}</Button>
          ),
        })
      }
    } else {
      formCopy.validateAllInputs()
      this.setState({ formInputs: formCopy })
    }
  }

  handleKeyDown = (event) => {
    // 13 is the enter key
    if (event.keyCode === 13) {
      let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
      const inputName = event.target.name

      formCopy.input(inputName).validate()

      this.setState({ formInput: formCopy })

      this.handleSubmit(event, formCopy)
    }
  }

  showErrorsMsg = errors => (
    errors.map(error => (
      (errors.length === 1 || error.infringedRule !== 'isRequired')
      &&
      <FormHelperText id="password-error-text" key={error.message}>{error.message}</FormHelperText>
    ))
  )

  formControl = (labelTxt, inputName, doHaveErrors, autoComplete, otherAttributes) => (
    <FormControl margin="normal" error={doHaveErrors} required fullWidth>
      <InputLabel htmlFor={`${inputName}`}>{labelTxt}</InputLabel>
      <Input
        id={`${inputName}`}
        name={`${inputName}`}
        autoComplete={autoComplete || `${inputName}`}
        autoFocus={false} // TODO: if autofocus true and data set by browser and user click outside window, email value would be empty and send error 
        value={this.state.formInputs.input(inputName).value}
        onChange={this.handleInputChange}
        onBlur={this.handleInputBlur}
        error={doHaveErrors}
        aria-describedby={`${inputName}-error-text`}
        {...otherAttributes}
      />
      {
        this.showErrorsMsg(this.state.formInputs.input(inputName).errors)
      }
    </FormControl>
  )

  registerLink = props => <RouterLink to="/register" {...props} />

  render() {
    const { classes } = this.props

    const emailHaveErrors = this.state.formInputs.doesInputHaveErrors('email')
    const passwordHaveErrors = this.state.formInputs.doesInputHaveErrors('password')

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
                type: 'password', onKeyDown: this.handleKeyDown
              })
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
              disabled={!this.state.formInputs.formIsValid}
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