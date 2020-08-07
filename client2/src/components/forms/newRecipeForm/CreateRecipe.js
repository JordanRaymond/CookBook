import React, { useState } from 'react'
import { Col, Row, Container } from "react-bootstrap"

import Recipe from '../../recipe/Recipe'
import Input from '../Input'
import MaskInput from '../MaskInput'

import FormInputs from '../../../lib/Validation/FormInputs'
import FormInput from '../../../lib/Validation/Input'
import { IsRequired, MinLength, IsAlphanumeric } from '../../../lib/Validation/rulesStrategies' 

import RecipeObj from '../../../lib/Recipe/Recipe' 

function CreateRecipe() {
    const [formInputs, setFormInputs] = useState(new FormInputs({
        // Recipe Header
        title: new FormInput([new IsRequired(), new IsAlphanumeric(), new MinLength(2)]),
        preparationTime: new FormInput([new IsAlphanumeric()]), // TODO parse and transform in ms
        cookingTime: new FormInput([new IsAlphanumeric()]),
        portions: new FormInput([new IsAlphanumeric()]),

        // Ingredients list is dynamically created in createIngredientsList and createIngredient
    }))
    const [recipeObj, setRecipeObj] = useState(new RecipeObj)

    const updateRecipeInfo = () => {
        let recipeClone = recipeObj // TODO deep clone?
        let recipeInfo = recipeClone.recipeInfo

        recipeClone.title = formInputs.input("title").value

        recipeInfo.preparationTimeInMs = formInputs.input("preparationTime").value
        recipeInfo.cookingTime = formInputs.input("cookingTime").value
        recipeInfo.portions = formInputs.input("portions").value

        recipeClone.recipeInfo = recipeInfo
        setRecipeObj(recipeClone)
    }

    const handleInputChange = event => {
       let formCopy = Object.assign(
         Object.create(formInputs),
         formInputs
       )
       formCopy.updateInput(event)
    
       const inputName = event.target.name
    
       formCopy.input(inputName).validate()
       formCopy.input(inputName).isTouched = true
    
       setFormInputs(formCopy)
       // updateRecipeInfo()
    }

    const handleInputBlur = event => {
        let formCopy = Object.assign(
            Object.create(formInputs),
            formInputs
        )
    
        formCopy.validate()
    
        setFormInputs(formCopy)
    }

    const generateInput = (labelTxt, inputName, required, fullWith, placeholder, type, otherAttributes) => (
        <Input
            label={labelTxt}
            type={type}
            placeholder={placeholder}
            fullWith={fullWith}
            required={required}
            name={inputName}
            isValid={formInputs.input(inputName).isValid}
            errors={formInputs.input(inputName).errors}
            value={formInputs.input(inputName).value}
            onChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            {...otherAttributes}
        />
      )

    return (
        <Container fluid>
            <Row>
                <Col lg={5} sm={8} xs={8} className="mx-auto mt-4 mb-4 recipe-form">
                    <Row>
                        <Col className="pt-2 shadow-container f-recipe-header">
                            <h2>Recipe Header</h2>
                            {generateInput("Title", "title", true, true, "recipe title", "text")}
                            <MaskInput
                                label="Preparation Time mask"
                                name={"preparationTime"}
                                placeholder={"(__D__H__M)"}
                                dataSlots={"_"}
                                isValid={formInputs.input("preparationTime").isValid}
                                errors={formInputs.input("preparationTime").errors}
    
                                onChange={handleInputChange}
                                handleInputBlur={handleInputBlur}
                                fullWith
                                required
                            />
                            <MaskInput
                                label="cookingTime Time mask"
                                name={"cookingTime"}
                                placeholder={"=:_:="}
                                dataSlots={"=_  "}
                                isValid={formInputs.input("cookingTime").isValid}
                                errors={formInputs.input("cookingTime").errors}
    
                                onChange={handleInputChange}
                                handleInputBlur={handleInputBlur}
                                fullWith
                                required
                            />
                            {generateInput("Preparation Time", "preparationTime", false, true, "preparation time", "text", { optional: true })}
                            {generateInput("Cooking Time", "cookingTime", false, true, "cooking time", "text", { optional: true })}
                            {generateInput("Portions", "portions", false, true, "portions", "text", { optional: true })}
                        </Col>
                    </Row>
                </Col>

                <Col lg={6} sm={8} xs={8} className="mx-auto mt-4 mb-4 shadow-container">
                    <Recipe recipe={recipeObj}/>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateRecipe
