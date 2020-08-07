import React, { useEffect, useState } from "react"
import {Container, Row, Col} from "react-bootstrap"

import RecipeSidebar from "./RecipesSidebar"
import Recipe from "./recipe/Recipe"
import { getUserRecipes } from "../lib/api"

function refineRecipes(recipes) {
  recipes = recipes.map(recipe => {
    recipe.websiteName = recipe.websiteName ? recipe.websiteName : "Originals"
    return recipe
  })

  return Object.entries(
    recipes.reduce((recipes, recipe) => {
      const { websiteName } = recipe

      recipes[websiteName] = recipes[websiteName]
        ? [...recipes[websiteName], recipe]
        : [recipe]

      return recipes
    }, [])
  )
}

const RecipesDashboard = () => {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  useEffect(() => {
    fetchUserRecipes()
  }, [])

  async function fetchUserRecipes() {
    try {
      const { recipes } = await getUserRecipes()
      setRecipes(recipes)
    } catch (err) {
      console.log(err)
    }
  }

  function setRecipe(recipeId) {
    const recipe = recipes.find(recipe => recipe.recipeId == recipeId)
    if (recipe) {
      setSelectedRecipe(recipe)
    }
  }

  const refinedRecipes = refineRecipes(recipes)

  return (
      <Container fluid>
        <Row>
          <RecipeSidebar recipes={refinedRecipes} setRecipe={setRecipe} />
          <Col lg={9} sm={8} xs={10} className="mx-auto mt-3 mb-3 recipe-container">
            <Recipe recipe={selectedRecipe} />
          </Col>
        </Row>
      </Container>
  )
}

export default RecipesDashboard
