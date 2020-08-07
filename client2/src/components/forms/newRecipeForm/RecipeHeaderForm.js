import React, { Fragment, useState } from "react"
import prettyMs from 'pretty-ms'

import { Row, Col } from "react-bootstrap"

const RecipeHeaderForm = ({ recipe }) => {
  const [recipeImgUrl, setRecipeImgUrl] = useState()
  const [recipeTitle, setRecipeTitle] = useState()

  const isRecipeSelected = recipe !== null && recipe !== undefined
  const img = isRecipeSelected ? recipe.recipeImgUrl : ""

  const recipeImgPlaceholderUrl = "https://enlivity.com/wp-content/uploads/2018/03/Empty-plate.jpg"

  function renderStyle(recipeImgUrl) {
    return recipeImgUrl
      ? {
          style: {
            backgroundImage: `url(${recipeImgUrl})`
          }
        }
      : {}
  }

  const imgToshow = recipeImgUrl == "" || recipeImgUrl == null ? recipeImgPlaceholderUrl : recipeImgUrl

  return (
    <Row className="recipe-header">
      <Col lg={12}>
        <div className="recipe-header-background" {...renderStyle(imgToshow)}></div>
        <Row>
          <Col lg={2}>
            <img className="recipe-header-img" src={imgToshow} />
          </Col>
          <Col lg={10}>
            <div className="material-input-group pt-1">      
              <input type="text" required />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Title</label>
            </div>
            {/* <h1 className={`header-title`}>{recipeTitle}</h1> */}
            <hr />
            <Row className="recipe-header-info" as="dl" >
              {
                recipe && (
                  <Fragment>
                    { recipe.recipeInfo.preparationTimeInMs && (
                      <Col lg={12}>
                        <dt>Preparation Time:</dt> 
                        <dd>{prettyMs(recipe.recipeInfo.preparationTimeInMs, {compact: true})}</dd>
                      </Col> 
                    )}
                    {recipe.recipeInfo.cookTimeInMs && (
                      <Col lg={12}>
                        <dt>Cooking Time:</dt> 
                        <dd>{prettyMs(recipe.recipeInfo.cookTimeInMs, {compact: true})}</dd>
                      </Col> 
                    )}
                    {recipe.recipeInfo.portions && (
                      <Col lg={12}>
                        <dt>Portions:</dt>
                        <dd>{recipe.recipeInfo.portions}</dd>
                      </Col> 
                    )}
                  </Fragment>
                )
              }
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default RecipeHeaderForm
