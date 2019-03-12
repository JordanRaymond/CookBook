import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  txtContent: {
    paddingTop: theme.spacing.unit * 2,
  },
})


const Ingredients = (props) => {
  const { classes } = props
  const { ingredients } = props

  return (
          <Fragment>
              <Typography variant="h3" mb={100}>
                Ingredients
              </Typography>
            {
              Array.isArray(ingredients) 
              ? ingredients.map((ingredient) => (
                <Typography variant="body2" key={ingredient} >
                {ingredient}
                </Typography>
              ))
              : Object.entries(ingredients).map(([title, ingredients]) => (
                  <Fragment>
                    <Typography variant="h5" key={title} className={classes.txtContent} >
                      {title}
                    </Typography>
                    {
                      ingredients.map((ingredient) => (
                        <Typography variant="body2" key={ingredient} >
                        {ingredient}
                        </Typography>
                      ))
                    }
                  </Fragment>          
              ))
            }
          </Fragment>          
  )
}
  


export default withStyles(styles)(Ingredients)