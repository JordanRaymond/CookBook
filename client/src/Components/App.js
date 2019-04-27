import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom"
import { CssBaseline, withStyles, Button } from '@material-ui/core'
import ReactLoading from 'react-loading'
import { withSnackbar } from 'notistack'

import { Header } from './Layouts'
import RecipeDrawer from './Recipe/RecipeDrawer'
import PrivateRoute from './Router/PrivateRoute'
import Auth from './Auth/Auth'
import Register from './Auth/Register'
import { isAuthenticate, logout } from '../Lib/API/api'

import 'typeface-roboto'

import { recipes } from '../Recipes.js'

const styles = theme => ({
  flex: {
    display: 'flex',
  },
  spinner: {
    flexGrow: 0.25, 
    margin: 'auto',
    marginTop: theme.spacing.unit * 20,
    color: theme.palette.primary
  },
  toolbar: theme.mixins.toolbar,
})
  
class App extends Component {
  state = {
    recipes, 
    isDrawerOpen: !this.isMobileDevice(),
    isDrawerLocked: !this.isMobileDevice(),
    isAuth: undefined,
  }

  async componentDidMount() {
    try {
       const { successful, message } = await isAuthenticate()    
       this.setState({ isAuth: successful })
    } catch(err) {
        this.props.enqueueSnackbar(err.message, {
          variant: 'error',
          persist: true,
          action: (
              <Button size="small">{'Dismiss'}</Button>
           ),
        })

        console.log(err)
    }
  }

   logoutUser = async () => {
    try {
       const { successful } = await logout()    
       this.setState({ isAuth: !successful })
    } catch(err) {
        this.props.enqueueSnackbar(err.message, {
          variant: 'error',
          persist: true,
          action: (
              <Button size="small">{'Dismiss'}</Button>
           ),
        })

         console.log(`App.js logout err: ${err}`)
    }
  }

  updateAuthState = (newAuthValue) => {
    this.setState({ isAuth: newAuthValue })
  }

  isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }

  handleDrawer = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }

  handleDrawerLock = () => {
    this.setState({ isDrawerLocked: !this.state.isDrawerLocked })
  }
  
  getRecipesBySiteName() {
    return Object.entries(this.state.recipes.reduce((recipes, recipe) => {
      const { websiteName } = recipe

      recipes[websiteName] = recipes[websiteName] 
      ? [...recipes[websiteName], recipe]
      : [recipe]

      return recipes
    }, {}))
  }

  hideDrawerButton = () => {
    // return window.location.pathname === '/login'
    return !this.state.isAuth
  }

  render() {
    const { classes } = this.props
    const recipesData = this.getRecipesBySiteName()
    const { isDrawerOpen, isDrawerLocked, isAuth } = this.state

    let recipeDrawerProps = { 
      recipesData: recipesData, 
      isDrawerOpen: isDrawerOpen, 
      isDrawerLocked: isDrawerLocked, 
      handleDrawerLock: this.handleDrawerLock,
      handleDrawerOpen: this.handleDrawer 
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Router >
          <Header 
            isDrawerOpen={isDrawerOpen}
            hideDrawerButton={this.hideDrawerButton()}
            handleDrawerOpen={this.handleDrawer} 
            isAuth={isAuth} 
            logout={this.logoutUser}
          />
          <div className={classes.flex}>
            <Switch>
              {/*Recipe rendered in the Drawer*/}
              { 
                isAuth === undefined ? (
                  <Fragment>
                    <div className={classes.toolbar} />
                    <ReactLoading type="bars" color='#3f51b5' className={classes.spinner} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <PrivateRoute exact path="/" component={RecipeDrawer} recipeDrawerProps={recipeDrawerProps} isAuth={isAuth} redirectTo="/login" />
                    <Route exact path="/login" render={ props => <Auth isAuth={isAuth} updateAuthState={this.updateAuthState} /> } />
                    <Route exact path="/register" render={ props => <Register isAuth={isAuth} updateAuthState={this.updateAuthState} /> } />
                  </Fragment>
                )
              }
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}


export default withSnackbar(withStyles(styles)(App))