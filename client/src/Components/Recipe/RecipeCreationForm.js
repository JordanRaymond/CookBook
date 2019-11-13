import React, { Fragment, Component } from 'react'
import { Typography, Paper, IconButton, Grid, FormControl, FormControlLabel, Input, InputLabel, FormHelperText } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import { RecipeHeader } from '../Layouts'
import IngredientInput from '../Layouts/Recipe/IngredientInput'
import classNames from 'classnames'
import './Recipe.css'

import FormInputs from '../../Lib/Validation/FormInputs'
import FormInput from '../../Lib/Validation/Input'
import { IsRequired, MinLength, IsAlphanumeric } from '../../Lib/Validation/rulesStrategies'


const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 3,
    flexGrow: 1,
  },
  txtContent: {
    padding: theme.spacing.unit * 3,
  },
  informations: {
    zIndex: 1,
  },
  toolbar: theme.mixins.toolbar,
  form: {
    marginRight: theme.spacing.unit * 2
  },
  marginTop: {
    marginTop: theme.spacing.unit *2,
    padding: theme.spacing.unit * 3,
  },
  ingredientsList: {
    marginTop: theme.spacing.unit *2
  },
  iconButton: {
    padding: 10,
  },
})

class RecipeCreationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isImgDialogOpen: false,

      isAuth: props.isAuth,
      waitingForRes: false,
      
      formInputs: new FormInputs({
        title: new FormInput([new IsRequired(), new IsAlphanumeric(), new MinLength(2)]),
        preparationTime: new FormInput([new IsRequired(), new IsAlphanumeric()]),
        cookingTime: new FormInput([new IsRequired(), new IsAlphanumeric()]),
        portions: new FormInput([new IsRequired(), new IsAlphanumeric()]),
      }),
      numberOfIngredients: 0
    }
  }

  handleInputChange = event => {
    let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
    formCopy.handleInputChange(event) // TODO: rename to updateInput

    this.setState({
      formInputs: formCopy,
    })
  }

  handleInputBlur = event => {
    let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
    const inputName = event.target.name

    formCopy.input(inputName).validate()
    formCopy.input(inputName).isTouched = true
    formCopy.validate()

    this.setState({
      formInputs: formCopy
    })
  }

  // TODO check if the title is not null and its an array, switch to obj 
  addIngredient = (title = null) => {
    let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)

    let nameInput = new FormInput([new IsRequired(), new IsAlphanumeric(), new MinLength(2)])
    let mesureInput = new FormInput([new IsRequired(), new IsAlphanumeric(), new MinLength(2)]) 
    let quantityInput = new FormInput([new IsRequired(), new MinLength(2)]) // Check number
    let indicationInput = new FormInput([new IsRequired(), new IsAlphanumeric(), new MinLength(2)])

    let index = this.state.numberOfIngredients
    formCopy.inputs['name'+index] = nameInput
    formCopy.inputs['mesure'+index] = mesureInput
    formCopy.inputs['quantity'+index] = quantityInput
    formCopy.inputs['indication'+index] = indicationInput

    this.setState({formInputs: formCopy, numberOfIngredients: index+1})
  }

  formControl = (labelTxt, inputName, required, doHaveErrors, autoComplete, otherAttributes) => (
    <FormControl margin="normal" error={ this.state.formInputs.input(inputName).haveErrors() } required={required} fullWidth>
      <InputLabel htmlFor={`${inputName}`}>{labelTxt}</InputLabel>
        <Input 
          id={`${inputName}`} 
          name={`${inputName}`} 
          autoComplete={autoComplete || `${inputName}`} 
          autoFocus={false} 
          value={this.state.formInputs.input(inputName).value} 
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur} 
          error={ this.state.formInputs.input(inputName).haveErrors() }
          aria-describedby={`${inputName}-error-text`}
          {...otherAttributes}   
        />
        { 
          this.showErrorsMsg(this.state.formInputs.input(inputName).errors)
        }
    </FormControl>
  )

  showErrorsMsg = errors => (
    errors.map(error => (    
      (errors.length === 1 || error.infringedRule !== 'isRequired') 
      && 
      <FormHelperText id="password-error-text" key={ error.message }>{error.message}</FormHelperText> 
    ))
  )

  render() {
    const { classes } = this.props
    const formInputs = this.state.formInputs

    let title = formInputs.input('title').value
    let recipeInfo = {
      preparationTimeInMs: formInputs.input('preparationTime').value,
      cookTimeInMs: formInputs.input('cookingTime').value,
      portions: formInputs.input('portions').value
    }
    const recipeImgUrl = 'https://freerangestock.com/sample/11197/empty-plate.jpg'
    return (
      <div className={classes.content}>
        <div className={classes.toolbar} />
          <Grid container justify="space-evenly">
            <Grid item xs={5} className={classes.form}>
              <Paper className={classes.txtContent}>
                <Typography variant="h5" className={'typo'} >
                  Recipe Header
                </Typography>
                <form className={classes.form}>
                  {this.formControl('Title', 'title', false, false)}
                  {this.formControl('Preparation Time', 'preparationTime', false, false)}
                  {this.formControl('Cooking Time', 'cookingTime', false, false)}
                  {this.formControl('Yield Portions', 'portions', false, false)}
                </form>
              </Paper>
              <Paper className={classes.txtContent, classes.marginTop}>
                <Typography variant="h5" className={'typo'} >
                  Ingredients
                  <IconButton className={classes.iconButton} aria-label="menu" onClick={() => this.addIngredient()}>
                    <AddOutlinedIcon />
                  </IconButton>
                </Typography>
               
                <div className={classes.ingredientsList}>
               { this.state.numberOfIngredients != 0 &&  <IngredientInput 
                    index={0}
                    name={formInputs.input('name'+0)} 
                    mesure={formInputs.input('mesure'+0)} 
                    quantity={formInputs.input('quantity'+0)} 
                    indication={formInputs.input('indication'+0)} 

                    handleInputChange={this.handleInputChange}
                    handleInputBlur={this.handleInputBlur}
                  />}
                </div>
                
              </Paper>

            </Grid>
            <Grid item xs>           
              <Paper className={classes.txtContent}>
                <RecipeHeader title={title} recipeInfo={recipeInfo} recipeImgUrl={recipeImgUrl}/>    
              </Paper>
            </Grid>
          </Grid>
      </div>
    )
  }
 
}

export default withStyles(styles)(RecipeCreationForm)