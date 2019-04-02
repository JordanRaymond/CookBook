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

  return (
    <Fragment>
      <div className={classes.content}>
      <Typography variant="h6" className={classes.text}>
        {`Preparation Time: ${prettyMs(recipeInfo.preparationTimeInMs)}`}
      </Typography>
        <Typography variant="h6" className={classes.text}>
        {`Cook time: ${prettyMs(recipeInfo.cookTimeInMs)}`}
      </Typography>
      <Typography variant="h6" className={classes.text}>
        Yield Portions: {recipeInfo.portions}
      </Typography>
      </div>
    </Fragment>
  )
}
  
export default withStyles(styles)(Informations)