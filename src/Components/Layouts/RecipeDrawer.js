import React, { Component, Fragment } from 'react'
import { Drawer, List, ListItem, ListItemText, Collapse, Divider, IconButton } from '@material-ui/core'
import { ExpandLess, ExpandMore, Lock, LockOpen } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import Recipe from '../Recipes/Recipe.js'

const drawerWidth = 240

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 3,
  },
  drawerOptions: {
    flexShrink: '1',
    padding: theme.spacing.unit * 0.35,
  },
  toolbar: theme.mixins.toolbar,
})


class RecipeDrawer extends Component {
  state = {
    drawersState: [],
    selectedRecipe: {}
  }

  handleCollapseClick = (websiteName) => {
    const drawersState = this.state.drawersState
    drawersState[websiteName] = !drawersState[websiteName]

    this.setState(
      state => (
        { drawersState: drawersState }
      )
    )
  }

  handleRecipeClick = (recipe) => {
      this.setState(state => ({selectedRecipe: recipe}))

    if (!this.props.isDrawerLocked) this.props.handleDrawerOpen()
  }
  
  render() {
    const { classes } = this.props
    const { recipesData, isDrawerOpen, isDrawerLocked } = this.props

    return (
      <Fragment>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          open={isDrawerOpen}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <div className={classes.drawerOptions}>
            <IconButton
              color="inherit"
              aria-label="Lock/Unlock Drawer auto closing"
              onClick={this.props.handleDrawerLock}
            >
              {isDrawerLocked ? <Lock fontSize='small' /> : <LockOpen fontSize='small'/>}
            </IconButton>
          </div>
          <Divider />
          <List>
            {recipesData.map(([websiteName, recipes]) => (
              <Fragment key={websiteName}>
                <ListItem button onClick={() => this.handleCollapseClick(websiteName)}>
                  <ListItemText primary={websiteName} />
                  {this.state.drawersState[websiteName] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                <Divider />
                <Collapse in={this.state.drawersState[websiteName]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                  {recipes.map((recipe) => (
                      <Fragment key={recipe.title}>
                        <ListItem button onClick={() => this.handleRecipeClick(recipe)} className={classes.nested}>
                          <ListItemText inset primary={recipe.title} />
                        </ListItem>
                        <Divider  variant="inset" />
                      </Fragment>
                  ))}
                  </List>
                </Collapse>
              </Fragment>
            ))}
          </List>
        </Drawer>
        <Recipe recipe={this.state.selectedRecipe} isDrawerOpen={isDrawerOpen}/>
      </Fragment>
    )
  }

}



export default withStyles(styles)(RecipeDrawer)