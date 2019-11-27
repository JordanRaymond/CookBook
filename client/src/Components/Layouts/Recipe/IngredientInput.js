import React, { Fragment, Component } from 'react'
import { Typography, Paper, InputBase, Grid, FormControl, FormControlLabel, Input, InputLabel, FormHelperText, IconButton  } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Ingredients from './Ingredients'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckIcon from '@material-ui/icons/Check'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import FormInputs from '../../../Lib/Validation/FormInputs'
import FormInput from '../../../Lib/Validation/Input'
import { IsRequired, MinLength, IsAlphanumeric } from '../../../Lib/Validation/rulesStrategies'
import color from '@material-ui/core/colors/purple';

const styles = theme => ({
    root: {
        marginTop:  theme.spacing.unit * 1,
        padding: '2px 4px',
        display: 'flex',
      },
      input: {
        marginLeft: theme.spacing.unit * 1,
        flex: 1,
      },
      removeIconButton: {
        padding: 10,
      },
      iconButton: {
        padding: 10,
      },  
      checkButton: {
        top:'29%',
      },
      arrowsRoot: {
        marginLeft:'auto',
        justifyContent:'flex-end',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
      },
      iconUpArrow: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      form: {
        marginRight: theme.spacing.unit * 2
      },
      ingredientString: {
        paddingTop: theme.spacing.unit * 1
      }
})

class IngredientInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isBeingEdited: true,
    }
  }

  formControl = (labelTxt, inputName, value, handleInputChange, handleInputBlur, doHaveErrors, errors, required) => (
    <FormControl margin="normal" error={ doHaveErrors } required={required} fullWidth>
      <InputLabel htmlFor={`${inputName}`}>{labelTxt}</InputLabel>
        <Input 
          id={`${inputName}`} 
          name={`${inputName}`} 
          value={value}
          autoComplete={`${inputName}`}
          autoFocus={false} 
          onChange={handleInputChange}
          onBlur={handleInputBlur} 
          error={doHaveErrors}
          aria-describedby={`${inputName}-error-text`}
        />
        { 
          this.showErrorsMsg(errors)
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

  doesIngredientHaveErrors = () => {
    return this.props.name.haveErrors() 
    || this.props.mesure.haveErrors() 
    || this.props.quantity.haveErrors() 
    || this.props.indication.haveErrors()
  }

  handleIsInputEdit = () => {
    this.setState({isBeingEdited: !this.state.isBeingEdited})
  }

  render() {
    const { classes } = this.props
    const ingredient = [{
        name: this.props.name.value,
        mesure: this.props.mesure.value,
        quantity: this.props.quantity.value,
        indication: this.props.indication.value
    }]
    
    const haveError = this.doesIngredientHaveErrors()
    const ingredientNumber = this.props.ingredientNumber
    const ingredientIndex = this.props.ingredientIndex

    return (
        <Paper className={classes.root}>
            <div>            
              {this.state.isBeingEdited && (                
                <IconButton className={classes.removeIconButton} aria-label="Delete" onClick={() => this.handleIsInputEdit()}>
                  <DeleteIcon />
                </IconButton>
              )}
              <IconButton className={(this.state.isBeingEdited ? classes.checkButton : classes.iconButton)} aria-label="Edit/Save" onClick={() => this.handleIsInputEdit()}>
                  {this.state.isBeingEdited ? <CheckIcon /> : <EditIcon {...(haveError && {color:'error'})} />}
              </IconButton>
            </div>
            {this.state.isBeingEdited ? (
                <div className={classes.form}>
                    {this.formControl(
                        'Name', 
                        'name'+ingredientNumber, 
                        this.props.name.value, 
                        this.props.handleInputChange, 
                        this.props.handleInputBlur, 
                        this.props.name.haveErrors(), 
                        this.props.name.errors,
                        false)}
                    {this.formControl(
                        'Mesure unit', 
                        'mesure'+ingredientNumber, 
                        this.props.mesure.value, 
                        this.props.handleInputChange, 
                        this.props.handleInputBlur, 
                        this.props.mesure.haveErrors(), 
                        this.props.mesure.errors,
                        false)}
                    {this.formControl(
                        'Quantity', 
                        'quantity'+ingredientNumber, 
                        this.props.quantity.value, 
                        this.props.handleInputChange, 
                        this.props.handleInputBlur, 
                        this.props.quantity.haveErrors(), 
                        this.props.quantity.errors,
                        false)}
                    {this.formControl(
                        'Additional Indication', 
                        'indication'+ingredientNumber, 
                        this.props.indication.value, 
                        this.props.handleInputChange, 
                        this.props.handleInputBlur, 
                        this.props.indication.haveErrors(), 
                        this.props.indication.errors,
                        false)}
               </div>
            ) : (
              <Fragment >
                <div className={classes.ingredientString}>
                  <Ingredients  ingredients={ingredient}/>
                </div>
                <div className={classes.arrowsRoot}>
                  {ingredientIndex !== 0 && (
                    <IconButton className={classes.iconUpArrow} aria-label="Move up" onClick={() => this.props.moveIngredientUp(ingredientIndex)}>
                      <ArrowDropUpIcon />
                    </IconButton>  
                  )}
                  {!this.props.isLastIngredient && (
                    <IconButton className={classes.iconButton} aria-label="Move down" onClick={() => this.props.moveIngredientDown(ingredientIndex)}>
                      <ArrowDropDownIcon />
                    </IconButton>
                  )}
                </div>
              </Fragment>
              )
            }
        </Paper>
    )
  }
 
}

export default withStyles(styles)(IngredientInput)