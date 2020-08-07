import React, { Fragment } from "react"
import { useAuthentication } from "../contexts/AuthContext"

import Header from "./Header"
import Presentation from "./Presentation"
import PrivateRoute from "./routes/PrivateRoute"
import RecipesDashboard from "./RecipesDashboard"
import Login from "./forms/Login"
import Register from "./forms/Register"
import CreateRecipe from './forms/newRecipeForm/CreateRecipe'
import { Route, Switch } from "react-router-dom"
import Loading from './Loading'

function Main() {
  const { user, pending } = useAuthentication()
  console.log(`Login user: ${user}`)

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <PrivateRoute exact path="/recipes/new" redirectTo="/login">
          <CreateRecipe />
        </PrivateRoute>
        <Route path="/">
          {
            pending ? <Loading /> : (
                user != null ? 
                <RecipesDashboard /> 
              : 
                <Presentation />
            )
          }
        </Route>
      </Switch>
    </Fragment>
  )
}

export default Main
