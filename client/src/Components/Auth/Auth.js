import React, { Component } from 'react'

import { withRouter, Redirect } from 'react-router-dom' 
import { withSnackbar } from 'notistack'
import Login from './Login'
import Register from './Register'

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
          isAuth: props.isAuth,
        }
    } 
  

  render() {
    const { isAuth, updateAuthState } = this.props

    console.log(`Auth isAuth: ${isAuth} ${window.location}`)
    
    return (
        isAuth === true ? <Redirect to="/" exact /> :      
        <Login updateAuthState={updateAuthState}/>
      )
  }
}

// SignIn.propTypes = {
//   classes: PropTypes.object.isRequired,
// }

export default withSnackbar(withRouter(SignIn))