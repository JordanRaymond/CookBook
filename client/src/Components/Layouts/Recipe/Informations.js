import React, {Fragment} from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import prettyMs from 'pretty-ms'

const styles = theme => ({
  content: {
    paddingLeft: theme.spacing.unit * 2,
    zIndex: 1, 
  },
  text: {
    color: 'white'
  }
})


const Informations = (props) => {
  const { classes } = props
  const { recipeInfo } = props

  // prettyMs(Number(recipeInfo.cookTimeInMs))
  const preparationTime = recipeInfo.preparationTimeInMs
  const cookingTime = recipeInfo.preparationTimeInMs
  const portions = recipeInfo.portions

  return (
    <Fragment>
      <div className={classes.content}>
        {recipeInfo.preparationTimeInMs &&     
        <Typography variant="h6" className={classes.text}>
          {`Preparation Time: ${preparationTime}`}
        </Typography>
        }
        {recipeInfo.cookTimeInMs &&
        <Typography variant="h6" className={classes.text}>
        {`Cook time: ${cookingTime}`}
        </Typography>
        }
        {recipeInfo.portions &&
        <Typography variant="h6" className={classes.text}>
          Yield Portions: {portions}
        </Typography>
        }
      </div>
    </Fragment>
  )
}
  
export default withStyles(styles)(Informations)