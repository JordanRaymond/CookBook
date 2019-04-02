import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
      Avatar, Button, FormControl, FormControlLabel, FormHelperText, Checkbox,
      Input, InputLabel, Paper, Typography, withStyles 
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import validate from '../../Lib/validate.js'

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
      const value = event.target.value

      const updatedControls = {
        ...this.state.formControls
      }

      let updatedFormElement = {
        ...updatedControls[name]
      }
      updatedFormElement.touched = true
      
      updatedFormElement = { ...updatedFormElement, ...validate(value, updatedFormElement.validationRules) } 
      console.log(updatedFormElement)
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

    handleSubmit = event => {
      event.preventDefault()
      console.log(this.state)

      const controls = {
        ...this.state.formControls
      }
      let formIsValid = true
      for (let inputIdentifier in controls) {
        formIsValid = controls[inputIdentifier].isValid && formIsValid
      }

      // TODO API submit or Show errors msg 
    }

  render() {
    const { classes } = this.props
    let isEmailValid = this.state.formControls.email.touched && !this.state.formControls.email.isValid
    let isPasswordValid = this.state.formControls.password.touched && !this.state.formControls.password.isValid

    return (
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
                  autoFocus 
                  value={this.state.formControls.email.value} 
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputBlur} 
                  error={ isEmailValid }
                  aria-describedby="email-error-text"
                />
                { this.state.formControls.email.errors.map(error => (
                    <FormHelperText id="email-error-text" key={ error }>{ error }</FormHelperText>
                  ))
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
                { this.state.formControls.password.errors.map(error => (
                    <FormHelperText id="password-error-text" key={ error }>{error}</FormHelperText>
                  ))
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
      );
  }
  
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);