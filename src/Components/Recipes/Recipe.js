import React, { Fragment } from 'react'
import { Typography, Paper, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Ingredients, Steps, Informations } from '../Layouts'
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

const Recipe = (props) => {
  const { classes, isDrawerOpen } = props
  const { title, ingredients, websiteName, recipeInfo, steps, recipeImgUrl } = props.recipe
  let haveRecipe = props.recipe.title !== undefined

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
            <div className={'titleBackground'} {...renderStyle(recipeImgUrl)}>
              <div className={'titleContainer'}>
                <img src={recipeImgUrl} className='recipeImg' />

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
          </Fragment>
        }
      </Paper>
    </main>
  )
}


export default withStyles(styles)(Recipe)