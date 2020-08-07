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
  let quantity = ingredient.quantity == null                              ? '' : `${ingredient.quantity}`
  let mesure = ingredient.mesure == null || ingredient.mesure === 'Unit'  ? '' : ingredient.mesure
  let indication = ingredient.indication == null || ingredient.indication == '' ? '' : `: ${ingredient.indication}`
  console.log(ingredient.indication)
  return `${quantity}${mesure} ${ingredient.name}${indication }`
}

const Ingredients = (props) => {
  const { classes } = props
  let { ingredients } = props
  // console.log(ingredients)
  ingredients = ingredients[0].ingredients

  return (  
          <Fragment>
            {
              Array.isArray(ingredients) 
              ? ingredients.map((ingredient) => (
                <Typography variant="body2" key={ingredient.name} >
                  {ingredientToString(ingredient)}
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