import React from "react"

const Header = ({ recipe }) => {
  const title = recipe != null ? recipe.title : "Select a recipe"
  const img = recipe != null ? recipe.recipeImgUrl : ""

  function renderStyle(recipeImgUrl) {
    return recipeImgUrl
      ? {
          style: {
            backgroundImage: `url(${recipeImgUrl})`
          }
        }
      : {}
  }

  return (
    <div className="row recipe-header" {...renderStyle(img)}>
      <h1 className="header-title">{title}</h1>
    </div>
  )
}

export default Header
