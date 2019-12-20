import React, { Fragment } from "react"
import { useAuthentication } from "../contexts/AuthContext"

import Container from "react-bootstrap/Container"
import Header from "./Header"
import Presentation from "./Presentation"
import PrivateRoute from "./routes/PrivateRoute"
import RecipesDashboard from "./RecipesDashboard"
import Login from "./Login"
import Register from "./Register"
import { Route, Switch } from "react-router-dom"

function Main() {
  const { user } = useAuthentication()
  console.log(`Login user: ${user}`)

  return (
    <Fragment>
      <Header />
      <Switch>
        <PrivateRoute path="/recipes"></PrivateRoute>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/">
          {user != null ? <RecipesDashboard /> : <Presentation />}
        </Route>
      </Switch>
    </Fragment>
  )
}

export default Main
