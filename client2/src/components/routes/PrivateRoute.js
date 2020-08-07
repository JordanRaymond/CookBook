import React from 'react'
import { useAuthentication } from '../../contexts/AuthContext'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom"
import Loading from '../Loading'

const PrivateRoute = ({ children, redirectTo,...rest }) => {
  const { user, pending } = useAuthentication()

  const RenderRedirect = (location) => {
    return (  
      <Redirect
        to={{
          pathname: redirectTo,
          state: { from: location }
        }}
      />
    )
  }

  if (pending) return <Loading />

  return (
      <>
        <Route
          {...rest}
          render={({location}) =>
              user != null ? children : RenderRedirect(location)
            }
        />
      </>
  )
}

export default PrivateRoute