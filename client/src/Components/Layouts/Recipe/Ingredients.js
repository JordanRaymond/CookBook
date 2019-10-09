import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  txtContent: {
    paddingTop: theme.spacing.unit * 2,
  },
  ingredient: {
    paddingLeft: theme.spacing.unit * 2,
  },
})

const ingredientToString = (ingredient) => {
  let mesure = ingredient.mesure == null || ingredient.mesure === 'Unit' ? '' : ingredient.mesure
  let qantity = ingredient.quantity == null ? '' : `, ${ingredient.quantity}`
  let indication = ingredient.indication == null ? '' : `: ${ingredient.indication}`

  return `${ingredient.name}${qantity}${mesure}${indication }`
}

const Ingredients = (props) => {
  const { classes } = props
  const { ingredients } = props
  // console.log(ingredients)
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
                  <Fragment key={title}>
                    <Typography variant="h5" className={classes.txtContent} >
                      {title}
                    </Typography>
                    {
                      ingredients.map((ingredient) => (
                        <Typography variant="body2" key={ingredient.name} className={classes.ingredient} gutterBottom>
                          {ingredientToString(ingredient)}
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