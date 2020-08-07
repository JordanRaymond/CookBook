import RecipeInfo from './RecipeInfo'
import IngredientsList from './IngredientsList'
import StepsList from './StepsList'

export default class Recipe {
    recipeId = null
    title = null
    websiteName = null
    recipeUrl = null
    recipeImgUrl = null
    recipeInfo = new RecipeInfo()
    ingredientsLists = []
    stepsLists = []
}

