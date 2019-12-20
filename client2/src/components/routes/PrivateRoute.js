import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom"

const PrivateRoute = ({ children, ...rest }) => {
  const {user} = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user != null ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}

export default PrivateRoute