import React from 'react'
import {
    Route,
    Redirect,
  } from "react-router-dom"

function PrivateRoute({ component: Component, recipeDrawerProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          true ? (
            <Component {...props} {...recipeDrawerProps}/>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute