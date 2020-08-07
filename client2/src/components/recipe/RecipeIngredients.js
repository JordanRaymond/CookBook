import React, {Fragment} from 'react'

 function RecipeIngredients({recipe}) {

    function ingredientToTxt(ingredient) {
        let {name, quantity, indication, mesure} = ingredient
        mesure = mesure === "Unit" || mesure === null   ? "" : mesure
        indication = indication === null                ? "" : indication
        quantity = quantity === null                    ? "" : quantity

        return (
            <li>{`${quantity}${mesure} ${name} ${indication}`}</li> 
        )
    }

    return (
        <Fragment>
            <h1 className="">Ingredients</h1>
            {recipe && recipe.ingredientsLists.map(ingredientList => (
                    <Fragment>
                        <h4 className="ml-2">{ingredientList?.title}</h4>
                        <ul>
                            {ingredientList.ingredients.map(ingredient => (
                                ingredientToTxt(ingredient)
                            ))}
                        </ul>
                    </Fragment>
                ))
            }
        </Fragment>
    )       
}
     
export default RecipeIngredients