import React from 'react'
import {
    Route,
    Redirect,
  } from 'react-router-dom'

const PrivateRoute = ({ component: Component, recipeDrawerProps, isAuth, redirectTo, ...rest }) => {
    console.log(`Private route isAuth: ${isAuth} ${window.location}`)
    return (
      <Route
        {...rest}
        render = { props => (
          isAuth ? ( 
              <Component {...props} {...recipeDrawerProps}/> 
            ) : (
            <Redirect
              to={{
                pathname: redirectTo,
                state: { from: props.location }
              }}
            />
          )
        )}
      />
    )
  }

export default PrivateRoute