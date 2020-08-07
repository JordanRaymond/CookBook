import React, { useState } from "react"
import uuid from "uuid/v1"

import { Col } from "react-bootstrap"
import Item from "./RecipesSidebar/Item"
import Dropdown from "./RecipesSidebar/Dropdown"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'

const RecipesSidebar = ({ recipes, setRecipe }) => {
  const [isActive, setIsActive] = useState(true) 

  const handleSidebarToggle = ()  => {
    setIsActive(!isActive)
  }


  function fillList(websiteRecipes) {
  let list = []

    for (let i = 0; i < 20; i++) {
      list.push(websiteRecipes.map(recipe => (
        <Item
          key={uuid()}
          text={recipe.title}
          onClick={() => setRecipe(recipe.recipeId)}
        />
      )))
    }

    return list
  }

  return (
    <Col className={`sidebar ${isActive && "active"}`}>
      {/* Sidebar toggle button */}
      <div className="custom-sidebar-button">
        <button type="button" id="sidebarCollapse" className="btn btn-primary" onClick={handleSidebarToggle}>
          <i className="fa fa-bars"> 
            <FontAwesomeIcon icon={faBookOpen} />
          </i>  
          <span className="sr-only">Toggle Menu</span>
        </button>
      </div>
      
      <div className="sidebar-header">
        <h1>Recipes</h1>
      </div>
      
      <p>Select a recipe</p>

      <ul className="list-unstyled ul-container">
        {recipes.map(([websiteName, websiteRecipes]) => (
          <Dropdown key={websiteName} text={websiteName}>
            {
              websiteRecipes.map(recipe => (
                <Item
                  key={uuid()}
                  text={recipe.title}
                  onClick={() => setRecipe(recipe.recipeId)}
                />
              )),
              fillList(websiteRecipes)
            } 
          </Dropdown>
        ))}
      </ul>
    </Col>
  )
}

export default RecipesSidebar
