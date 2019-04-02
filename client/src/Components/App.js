import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import { Header } from './Layouts'
import RecipeDrawer from './Recipe/RecipeDrawer'
import PrivateRoute from './Router/PrivateRoute'
import Auth from './Auth/Auth'
import 'typeface-roboto'

import { recipes } from '../Recipes.js'

const styles = theme => ({
  root: {

  },
  flex: {
    display: 'flex'
  },
})
  
class App extends Component {
  state = {
    recipes, 
    isDrawerOpen: !this.isMobileDevice(),
    isDrawerLocked: !this.isMobileDevice(),
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
    const { isDrawerOpen, isDrawerLocked} = this.state

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
          <div className={classes.flex}>
            <Route path="/login" component={Auth} />
            <PrivateRoute exact path="/" component={RecipeDrawer} recipeDrawerProps={recipeDrawerProps} />
            {/*Recipe rendered in the Drawer*/}
            {/*<RecipeDrawer 
              recipesData={recipesData} 
              isDrawerOpen={isDrawerOpen} 
              isDrawerLocked={isDrawerLocked} 
              handleDrawerLock={this.handleDrawerLock}
              handleDrawerOpen={this.handleDrawer}
            />*/}
          </div>
        </Router>
      </div>
    )
  }
}


export default withStyles(styles)(App)