import React, { useState, useEffect } from "react"
import { Col, Row, Container } from "react-bootstrap"

import Recipe from "../../recipe/Recipe"
import BossaInput from "../BossaInput"
import MaskInput from "../MaskInput"

import FormInputs from "../../../lib/Validation/FormInputs"
import FormInput from "../../../lib/Validation/Input"
import {
  IsRequired,
  MinLength,
  IsAlphanumeric,
  IsNumeric,
} from "../../../lib/Validation/rulesStrategies"

import RecipeObj from "../../../lib/Recipe/Recipe"

function timeToMs(time) {
  const groups = []
  const regex = /\d{2}/g
  let m
  while ((m = regex.exec(time))) {
    groups.push(parseInt(m[0], 10))
  }

  const days = groups[0]
  const hours = groups[1]
  const minutes = groups[2]

  return hoursToMs(24 * days) + hoursToMs(hours) + minToMs(minutes)
}

function hoursToMs(hours) {
  return minToMs(hours * 60)
}

function minToMs(minutes) {
  return minutes * 60000
}

function CreateRecipe() {
  const [formInputs, setFormInputs] = useState(
    new FormInputs({
      // Recipe Header
      title: new FormInput([
        new IsRequired(),
        new IsAlphanumeric(),
        new MinLength(2),
      ]),
      preparationTime: new FormInput([new IsNumeric()], {
        dataExtractor: /(.{0,2})d (.{0,2})h (.{0,2})m/,
      }),
      cookingTime: new FormInput([new IsNumeric()], {
        dataExtractor: /(.{0,2})d (.{0,2})h (.{0,2})m/,
      }),
      portions: new FormInput([new IsNumeric()]),
      bossaTest: new FormInput([new IsNumeric()]),

      // Ingredients list is dynamically created in createIngredientsList and createIngredient
    })
  )
  const [ingredientsLists, setIngredientsLists] = useState([])
  // The recipe object that wee pass to the recipe preview
  const [recipeObj, setRecipeObj] = useState(new RecipeObj())

  useEffect(() => {
    let formCopy = Object.assign(Object.create(formInputs), formInputs)
  }, [])

  const setValue = (inputName, value, validate = true) => {
    let formCopy = Object.assign(Object.create(formInputs), formInputs)
    formCopy.input(inputName).value = value

    if (validate) {
      formCopy.input(inputName).validate()
      formCopy.input(inputName).isTouched = true
    }

    updateRecipeInfo()
    setFormInputs(formCopy)
  }

  const updateRecipeInfo = () => {
    let recipeClone = recipeObj // TODO deep clone?
    let recipeInfo = recipeClone.recipeInfo

    recipeClone.title = formInputs.input("title").value
    recipeInfo.preparationTimeInMs = timeToMs(
      formInputs.input("preparationTime").extractedValue()
    )
    recipeInfo.cookTimeInMs = timeToMs(formInputs.input("cookingTime").value)
    recipeInfo.portions = formInputs.input("portions").value

    recipeClone.recipeInfo = recipeInfo
    setRecipeObj(recipeClone)
  }

  const handleInputChange = (event) => {
    let formCopy = Object.assign(Object.create(formInputs), formInputs)
    formCopy.updateInput(event)

    const inputName = event.target.name

    formCopy.input(inputName).validate()
    formCopy.input(inputName).isTouched = true

    setFormInputs(formCopy)
    updateRecipeInfo()
  }

  const handleInputBlur = (event) => {
    let formCopy = Object.assign(Object.create(formInputs), formInputs)

    const inputName = event.target.name

    formCopy.input(inputName).validate()
    formCopy.input(inputName).isTouched = true
    formCopy.validate()

    setFormInputs(formCopy)
  }

  const createIngredientsList = () => {
    let formCopy = Object.assign(Object.create(formInputs), formInputs)
    let ingredientsListsCpy = ingredientsLists
    let titleInput = new FormInput([new IsAlphanumeric(), new MinLength(2)])
    let newList = { ingredientsOrder: [] }

    ingredientsListsCpy.push(newList)
    formCopy.inputs['title'+listCount] = titleInput

    let listCount = ingredientsListsCpy.length
    createIngredient(listCount)

    setFormInputs(formCopy)
    setIngredientsLists(ingredientsListsCpy)
  }

    // TODO check if the title is not null and its an array, switch to obj 
    createIngredient = (listIndex) => {
        let formCopy = Object.assign(Object.create(formInputs), formInputs)
        let ingredientIndex = ingredientsIndex
        let ingredientsLists = ingredientsLists
    
        let nameInput = new FormInput([new IsRequired(), new IsAlphanumeric(), new MinLength(2)])
        let mesureInput = new FormInput([new IsRequired(), new IsAlphanumeric(), new MinLength(2)]) 
        let quantityInput = new FormInput([new IsRequired(), new MinLength(2)]) // Check is number
        let indicationInput = new FormInput([new IsAlphanumeric(), new MinLength(2)])
    
        formCopy.inputs['name'+ingredientIndex] = nameInput
        formCopy.inputs['mesure'+ingredientIndex] = mesureInput 
        formCopy.inputs['quantity'+ingredientIndex] = quantityInput
        formCopy.inputs['indication'+ingredientIndex] = indicationInput
    
        ingredientsLists[listIndex].ingredientsOrder.push(ingredientIndex)
    
        this.setState({formInputs: formCopy, ingredientsIndex: ingredientIndex+1, ingredientsLists: ingredientsLists})
      }

  const renderIngredientsLists = () => {
    let lists = []
    
    for (let i = 0; i < ingredientsLists.length; i++) {
      lists.push((
          // TODO create class
          <div className={`ingredientsList`}>
              {/* Function to create bossaInput */}
            {bossaInputWrapper('List title (optional)', 'title'+i, false)}
            {renderIngredients(ingredientsLists[i].ingredientsOrder)}
            <Button  color="secondary" aria-label="add" className={this.props.classes.bottomSectionButton} onClick={()=>this.createIngredient(i)}>
              Add ingredient
            </Button>
          </div>
        ))

    }
    
    return <Fragment>{lists}</Fragment>
  }

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

  const bossaInputWrapper = (label, inputName, required) => {
    return generateInput(
        label,
        inputName,
        required,
        true,
        label,
        "text",
        { autocomplete: "off" }
    )
  }

  const generateInput = (
    labelTxt,
    inputName,
    required,
    fullWith,
    placeholder,
    type,
    otherAttributes
  ) => (
    <BossaInput
      label={labelTxt}
      type={type}
      placeholder={placeholder}
      fullWith={fullWith}
      required={required}
      name={inputName}
      isValid={formInputs.input(inputName).isValid}
      errors={formInputs.input(inputName).errors}
      value={formInputs.input(inputName).value}
      isTouched={formInputs.input(inputName).isTouched}
      onChange={handleInputChange}
      handleInputBlur={handleInputBlur}
      {...otherAttributes}
    />
  )

  return (
    <Container fluid>
      <Row>
        {/* ===== FORM ===== */}
        <Col lg={5} sm={8} xs={8} className="mx-auto mt-4 mb-4 recipe-form">
          <Row>
            <Col className="pt-2 shadow-container f-recipe-header">
              <h3 className="text-center">Recipe Information</h3>
              <Row>
                <Col lg={8} sm={8} xs={12}>
                  {" "}
                  {generateInput(
                    "Title",
                    "title",
                    true,
                    true,
                    "recipe title",
                    "text",
                    { autocomplete: "off" }
                  )}
                </Col>
                <Col lg={4} sm={4} xs={12}>
                  {" "}
                  {generateInput(
                    "Portions",
                    "portions",
                    false,
                    true,
                    "portions",
                    "text",
                    { optional: true }
                  )}
                </Col>
              </Row>
              <Row>
                <Col lg={6} sm={6} xs={12}>
                  <MaskInput
                    label="Preparation Time"
                    name={"preparationTime"}
                    placeholder={"00d 00h 00m"}
                    dataSlots={"0"}
                    value={formInputs.input("preparationTime").value}
                    isValid={formInputs.input("preparationTime").isValid}
                    errors={formInputs.input("preparationTime").errors}
                    isTouched={formInputs.input("preparationTime").isTouched}
                    setValue={setValue}
                    handleInputBlur={handleInputBlur}
                    fullWith
                    required
                  />
                </Col>
                <Col lg={6} sm={6} xs={12}>
                  <MaskInput
                    label="Cooking Time"
                    name={"cookingTime"}
                    placeholder={"00d 00h 00m"}
                    dataSlots={"0"}
                    value={formInputs.input("cookingTime").value}
                    isValid={formInputs.input("cookingTime").isValid}
                    errors={formInputs.input("cookingTime").errors}
                    isTouched={formInputs.input("cookingTime").isTouched}
                    setValue={setValue}
                    handleInputBlur={handleInputBlur}
                    fullWith
                    required
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        {/* !!==end FORM end==!! */}

        <Col
          lg={6}
          sm={8}
          xs={8}
          className="mx-auto mt-4 mb-4 shadow-container"
        >
          <Recipe recipe={recipeObj} />
        </Col>
      </Row>
    </Container>
  )
}

export default CreateRecipe
