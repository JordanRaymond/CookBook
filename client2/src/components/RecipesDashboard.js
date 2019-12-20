import React, { Fragment, useEffect, useState } from "react"
import Container from "react-bootstrap/Container"

import Header from "./recipe/Header"
import RecipeSidebar from "./RecipesSidebar"
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
    setSelectedRecipe(recipes.find(recipe => recipe.recipeId == recipeId))
  }

  const barRecipes = refineRecipes(recipes)

  return (
    <Fragment>
      <Container fluid className="sidebar-fix">
        <RecipeSidebar recipes={barRecipes} setRecipe={setRecipe} />
        <div className="row">
          <div className="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-9 mx-auto my-4 recipe-container">
            {/*<Header recipe={selectedRecipe} />*/}
            <h1>test</h1>
          </div>
        </div>
      </Container>
    </Fragment>
  )
}

export default RecipesDashboard
