import React, { Fragment, Component } from 'react'
import { Typography, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Ingredients, Steps, RecipeHeader } from '../Layouts'
import classNames from 'classnames'
import './Recipe.css'

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3,
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -240,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  txtContent: {
    padding: theme.spacing.unit * 3,
  },
  informations: {
    zIndex: 1,
  },
  toolbar: theme.mixins.toolbar,
})

class Recipe extends Component {
  state = {
    isImgDialogOpen: false,
  }

  handleImgDialog = () => {
    this.setState({ isImgDialogOpen: !this.state.isImgDialogOpen })
  }

  render() {
    const { classes, isDrawerOpen } = this.props
    const { title, ingredients, websiteName, recipeInfo, steps, recipeImgUrl } = this.props.recipe
    let haveRecipe = this.props.recipe.title !== undefined
    console.log('called recipe')
    return (
      <main className={classNames(classes.content, {
        [classes.contentShift]: isDrawerOpen,
      })}>
        <div className={classes.toolbar} />
        <Fragment> 
          <Paper className={classes.txtContent}>
            { !haveRecipe ?
              <Typography variant="h4" className={'typo'}>
                Select a recipe
              </Typography>
            :
              <Fragment> 
                <RecipeHeader title={title} websiteName={websiteName} recipeInfo={recipeInfo} recipeImgUrl={recipeImgUrl}/>
                
                <div style={{ paddingBottom: 50 }}>
                  <Typography variant="h3" mb={100}>
                    Ingredients
                  </Typography>
                  <Ingredients ingredients={ingredients} />
                </div>

                <Steps steps={steps} />
              </Fragment>
            }
          </Paper>
        </Fragment>

      </main>
    )
  }
 
}


export default withStyles(styles)(Recipe)