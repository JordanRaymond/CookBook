import React, { Fragment, Component } from 'react'
import { Typography, Paper, IconButton, Grid, FormControl, FormControlLabel, Input, InputLabel, FormHelperText, Fab, Button } from '@material-ui/core'
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
  ingredientsContainer: {
    marginTop: theme.spacing.unit *2,
    padding: theme.spacing.unit * 3,
  },
  ingredientsList: {
    marginTop: theme.spacing.unit *2,
    padding: theme.spacing.unit * 3,
    borderLeft: `6px solid`,
    borderLeftColor: theme.palette.primary.main,
    borderradius: '5px',
    backgroundColor: theme.palette.background.default,
  },
  iconButton: {
    padding: 10,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit * 1,
  },
  ingredientsHeader: {
  },
  topSectionButton: {
    boxShadow:'none',
    marginLeft: theme.spacing.unit * 2
  },
  bottomSectionButton: {
    boxShadow:'none',
    marginTop: theme.spacing.unit * 2,
  },
  sectionTypo: {
    fontWeight: 'bold'
  }
})

class RecipeCreationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isImgDialogOpen: false,

      isAuth: props.isAuth,
      waitingForRes: false,
      
      formInputs: new FormInputs({
        // Recipe Header
        title: new FormInput([new IsRequired(), new IsAlphanumeric(), new MinLength(2)]),
        preparationTime: new FormInput([new IsRequired(), new IsAlphanumeric()]),
        cookingTime: new FormInput([new IsRequired(), new IsAlphanumeric()]),
        portions: new FormInput([new IsRequired(), new IsAlphanumeric()]),

        // Ingredients list are dynamically created in createIngredientsList and createIngredient
      }),

      ingredientsLists: [],
      ingredientsIndex: 0
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

  createIngredientsList = () => {
    let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
    let ingredientsLists = this.state.ingredientsLists
    
    let listCount = ingredientsLists.length
    let newList = { ingredientsOrder: [] }
    let titleInput = new FormInput([new IsAlphanumeric(), new MinLength(2)])
    
    formCopy.inputs['title'+listCount] = titleInput
  
    ingredientsLists.push(newList)

    this.createIngredient(listCount)

    this.setState({formInputs: formCopy, ingredientsList: ingredientsLists})
  }

  // TODO check if the title is not null and its an array, switch to obj 
  createIngredient = (listIndex) => {
    let formCopy = Object.assign(Object.create(this.state.formInputs), this.state.formInputs)
    let ingredientIndex = this.state.ingredientsIndex
    let ingredientsLists = this.state.ingredientsLists

    let nameInput = new FormInput([new IsRequired(), new IsAlphanumeric(), new MinLength(2)])
    let mesureInput = new FormInput([new IsRequired(), new IsAlphanumeric(), new MinLength(2)]) 
    let quantityInput = new FormInput([new IsRequired(), new MinLength(2)]) // Check number
    let indicationInput = new FormInput([new IsAlphanumeric(), new MinLength(2)])

    formCopy.inputs['name'+ingredientIndex] = nameInput
    formCopy.inputs['mesure'+ingredientIndex] = mesureInput 
    formCopy.inputs['quantity'+ingredientIndex] = quantityInput
    formCopy.inputs['indication'+ingredientIndex] = indicationInput

    ingredientsLists[listIndex].ingredientsOrder.push(ingredientIndex)

    this.setState({formInputs: formCopy, ingredientsIndex: ingredientIndex+1, ingredientsLists: ingredientsLists})
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

  renderIngredients = (ingredientsOrder) => {
    const formInputs = this.state.formInputs
    let ingredients = []

    for (var i = 0; i < ingredientsOrder.length; i++) {
      const ingredientNumber = ingredientsOrder[i]

      ingredients.push(<IngredientInput 
        ingredientNumber={ingredientNumber}
        ingredientIndex={i}
        name={formInputs.input('name'+ingredientNumber)} 
        mesure={formInputs.input('mesure'+ingredientNumber)} 
        quantity={formInputs.input('quantity'+ingredientNumber)} 
        indication={formInputs.input('indication'+ingredientNumber)} 

        handleInputChange={this.handleInputChange}
        handleInputBlur={this.handleInputBlur}
        moveIngredientUp={this.moveIngredientUp}
        moveIngredientDown={this.moveIngredientDown}
        isLastIngredient={i === ingredientsOrder.length-1}
      />)
    }

    return <Fragment>{ingredients}</Fragment>
  }

  renderIngredientsLists = () => {
    let lists = []
    
    for (let i = 0; i < this.state.ingredientsLists.length; i++) {
      lists.push((
          <div className={this.props.classes.ingredientsList}>
            {this.formControl('List title (optional)', 'title'+i, false, false)}
            {this.renderIngredients(this.state.ingredientsLists[i].ingredientsOrder)}
            <Button  color="secondary" aria-label="add" className={this.props.classes.bottomSectionButton} onClick={()=>this.createIngredient(i)}>
              Add ingredient
            </Button>
          </div>
        ))

    }
    
    return <Fragment>{lists}</Fragment>
  }

  moveIngredientUp = (ingredientIndex) => {
    if (ingredientIndex !== 0) {
      let ingredientsOrderCpy = this.state.ingredientsOrder
      let firstIngredientNum = ingredientsOrderCpy[ingredientIndex]
      let secondIngredientNum = ingredientsOrderCpy[ingredientIndex-1]
  
      ingredientsOrderCpy[ingredientIndex] = secondIngredientNum
      ingredientsOrderCpy[ingredientIndex-1] = firstIngredientNum
  
      this.setState({ingredientsOrder: ingredientsOrderCpy})
    }
  }

  moveIngredientDown = (ingredientIndex) => {
    if (ingredientIndex !== this.state.ingredientsOrder.length-1) {
      let ingredientsOrderCpy = this.state.ingredientsOrder
      let firstIngredientNum = ingredientsOrderCpy[ingredientIndex]
      let secondIngredientNum = ingredientsOrderCpy[ingredientIndex+1]
  
      ingredientsOrderCpy[ingredientIndex] = secondIngredientNum
      ingredientsOrderCpy[ingredientIndex+1] = firstIngredientNum
  
      this.setState({ingredientsOrder: ingredientsOrderCpy})
    }
  }

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
                <Typography variant="h5" fontWeight="fontWeightBold" className={classes.sectionTypo} >
                  Recipe Header
                </Typography>
                <form className={classes.form}>
                  {this.formControl('Title', 'title', false, false)}
                  {this.formControl('Preparation Time', 'preparationTime', false, false)}
                  {this.formControl('Cooking Time', 'cookingTime', false, false)}
                  {this.formControl('Yield Portions', 'portions', false, false)}
                </form>
              </Paper>

              <Paper className={classes.ingredientsContainer}>
                <div className={classes.ingredientsHeader}>
                <Typography variant="h5" className={classes.sectionTypo}>
                  {'Ingredients '}   
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    aria-label="Create ingredient list"
                    className={classes.topSectionButton}
                    onClick={() => this.createIngredientsList()}
                  >
                    <AddOutlinedIcon />
                    New list
                  </Button>
                </Typography>
                </div>
                  {
                    this.state.ingredientsLists.length != 0 &&  
                    this.renderIngredientsLists()
                  }
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