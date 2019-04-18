import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import ReactLoading from 'react-loading'
import { Header } from './Layouts'
import RecipeDrawer from './Recipe/RecipeDrawer'
import PrivateRoute from './Router/PrivateRoute'
import Auth from './Auth/Auth'
import { isAuthenticate } from '../Lib/API/api'

import 'typeface-roboto'

import { recipes } from '../Recipes.js'

const styles = theme => ({
  root: {

  },
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
       window.alert(`App componentDidMount isAuth state: ${successful}`)
    } catch(err) {
       console.log(err)
       window.alert(err)
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

  render() {
    const { classes } = this.props
    const recipesData = this.getRecipesBySiteName()
    const { isDrawerOpen, isDrawerLocked, isAuth } = this.state

    console.log(`App isAuth: ${isAuth} ${window.location}`)

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
        <Header isDrawerOpen={isDrawerOpen} handleDrawerOpen={this.handleDrawer}/>
        <Router >
          <Switch>
            {/*Recipe rendered in the Drawer*/}
            <div className={classes.flex}>
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
                  </Fragment>
                )
              }
            </div>
          </Switch>
        </Router>
      </div>
    )
  }
}


export default withStyles(styles)(App)