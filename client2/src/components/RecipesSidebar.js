import React from "react"
import Sidebar from "./RecipesSidebar/Sidebar"
import Item from "./RecipesSidebar/Item"
import Dropdown from "./RecipesSidebar/Dropdown"
import uuid from "uuid/v1"

const RecipesSidebar = ({ recipes, setRecipe }) => {
  return (
    <Sidebar title="Recipes">
      <p>Select a recipe</p>
      {recipes.map(([websiteName, websiteRecipes]) => (
        <Dropdown key={websiteName} text={websiteName}>
          {websiteRecipes.map(recipe => (
            <Item
              key={uuid()}
              text={recipe.title}
              onClick={() => setRecipe(recipe.recipeId)}
            />
          ))}
        </Dropdown>
      ))}

      {/* <Link to="/test" text="About" />
      <Dropdown text="Pages">
        <Link to="/test" text="page 1" />
        <Link to="/test" text="page 2" />
        <Link to="/test" text="page 2" />
      </Dropdown> */}
    </Sidebar>
  )
}

export default RecipesSidebar
