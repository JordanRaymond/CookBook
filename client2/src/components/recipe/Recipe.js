import React, { Fragment } from "react"

import { Col, Row } from "react-bootstrap"
import RecipeHeader from "./RecipeHeader"
import RecipeIngredients from "./RecipeIngredients"
import RecipeSteps from "./RecipeSteps"

function Recipe({ recipe }) {
  return (
    <Fragment>
      <RecipeHeader recipe={recipe} />
      {recipe && (
        <Row className="mt-3">
          <Col lg={4} md={3}>
            <RecipeIngredients recipe={recipe} />
          </Col>
          <Col>
            <RecipeSteps recipe={recipe} />
          </Col>
        </Row>
      )}
    </Fragment>
  )
}

export default Recipe
