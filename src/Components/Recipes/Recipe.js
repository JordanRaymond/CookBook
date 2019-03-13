import React, { Fragment, Component } from 'react'
import { Typography, Paper, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Ingredients, Steps, Informations, ImgDialog } from '../Layouts'
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
});

const renderStyle = (recipeImgUrl) => (
  recipeImgUrl ? ({
    style: {
      backgroundImage: `url(${recipeImgUrl})`,
    }
  }) : ({})
)

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

    return (
      <main className={classNames(classes.content, {
        [classes.contentShift]: isDrawerOpen,
      })}>
        <div className={classes.toolbar} />
        <Paper className={classes.txtContent}>
          { !haveRecipe ?
            <Typography variant="h3" className={'typo'}>
              Select a recipe
            </Typography>
          :
            <Fragment> 
              {/* TODO: Extract to Recipe Header or something like that */}
              <div className={'titleBackground'} {...renderStyle(recipeImgUrl)}>
                <div className={'titleContainer'}>
                  <img src={recipeImgUrl} className='recipeImg' onClick={this.handleImgDialog}/>
  
                  <div className={'rightImgContainer'}>
                    <Typography variant="h3" className={'typo'} >
                      {title}
                    </Typography>
                    <hr className={'typo'}/>
                    
                    <Informations recipeInfo={recipeInfo} className={'typo'} />
                  </div>
                </div>
              </div>             
              <Typography variant="caption">
                {`from ${websiteName}`}        
              </Typography>
              
              <div style={{ paddingBottom: 50 }}>
                <Ingredients ingredients={ingredients} />
              </div>

              <Steps steps={steps} />
  
              <ImgDialog recipeImgUrl={recipeImgUrl} isImgDialogOpen={this.state.isImgDialogOpen} handleImgDialog={this.handleImgDialog}/>
            </Fragment>
          }
        </Paper>
      </main>
    )
  }
 
}


export default withStyles(styles)(Recipe)