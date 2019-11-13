import React, { Fragment, Component } from 'react'
import { Typography, Paper, InputBase, Grid, FormControl, FormControlLabel, Input, InputLabel, FormHelperText, IconButton  } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Ingredients from './Ingredients'
import EditIcon from '@material-ui/icons/Edit'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import FormInputs from '../../../Lib/Validation/FormInputs'
import FormInput from '../../../Lib/Validation/Input'
import { IsRequired, MinLength, IsAlphanumeric } from '../../../Lib/Validation/rulesStrategies'

const styles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
      },
      input: {
        marginLeft: theme.spacing.unit * 1,
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      form: {
        marginRight: theme.spacing.unit * 2
      },
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
    
    const index = this.props.index
    return (
        <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu" onClick={() => this.handleIsInputEdit()}>
                {this.state.isBeingEdited ? <EditOutlinedIcon /> : <EditIcon />}
            </IconButton>
            {this.state.isBeingEdited ? (
                <div className={classes.form}>
                    {this.formControl(
                        'Name', 
                        'name'+index, 
                        ingredient.name, 
                        this.props.handleInputChange, 
                        this.props.handleInputBlur, 
                        this.props.name.haveErrors(), 
                        this.props.name.errors,
                        false)}
                    {this.formControl(
                        'Mesure unit', 
                        'mesure'+index, 
                        ingredient.mesure, 
                        this.props.handleInputChange, 
                        this.props.handleInputBlur, 
                        this.props.mesure.haveErrors(), 
                        this.props.mesure.errors,
                        false)}
                    {this.formControl(
                        'Quantity', 
                        'quantity'+index, 
                        ingredient.quantity, 
                        this.props.handleInputChange, 
                        this.props.handleInputBlur, 
                        this.props.quantity.haveErrors(), 
                        this.props.quantity.errors,
                        false)}
                    {this.formControl(
                        'Additional Indication', 
                        'indication'+index, 
                        ingredient.indication, 
                        this.props.handleInputChange, 
                        this.props.handleInputBlur, 
                        this.props.indication.haveErrors(), 
                        this.props.indication.errors,
                        false)}
               </div>
            ) : <Ingredients ingredients={ingredient}/>
            }
        
        </Paper>
    )
  }
 
}

export default withStyles(styles)(IngredientInput)