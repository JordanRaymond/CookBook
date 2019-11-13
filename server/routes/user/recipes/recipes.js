const express = require('express')
const router = express.Router()
const { Users: User, Recipes, StepsLists, IngredientsLists, Steps, RecipeIngredients } = require('../../../models')
const asyncMiddleware = require('../../../utils/asyncMiddleware') 
const asyncForEach = require('../../../utils/asyncForEach') 
const areRecipeInputsValid = require('../../../utils/validation/recipeValidation')
const { isFromType } = require('../../../utils/validation/validation')

const { isEmpty } = require('../../../utils/validation/validation')

router.get('/', asyncMiddleware( async (req, res, next) => {
    if(!req.isAuthenticated()) {
      return res.status(401).json({
        isAuth: false,
        message: 'User not authenticated, can\'t get recipes.'
      })
    }
    let recipes = await getUserRecipes(req.user)
  
    return res.status(200).json({ 
      message : `${req.user.username} recipes`,
      recipes: recipes
    })
  }))

  router.post('/', asyncMiddleware( async(req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.status(401).json({
          isAuth: false,
          message: 'User not authenticated, can\'t get create new recipe.'
        })
    }
    const errMsg = `Validation of the recipe form inputs failed.`
    const recipeData = req.body
    
    const areRecipeDataValid = isRecipeValid(recipeData)

    if (!areRecipeDataValid) {
      return res.status(400).json({ 
        message : errMsg,
      })
    }
    let user = await User.findOne({ where: {email: req.user.email } })
    const recipe = await createNewRecipe(recipeData, user)

    return res.status(200).json({recipeData: recipeData})
  }))
  
  function isRecipeValid(recipeData) {
     return areRecipeInputsValid(recipeData)
  }
  

  async function createNewRecipe(recipeData, user) {
    const title = recipeData.title.trim()
    const websiteName = getValueOrNull(recipeData.websiteName) 
    const recipeUrl = getValueOrNull(recipeData.recipeUrl)
    const recipeImgUrl = getValueOrNull(recipeData.recipeImgUrl)
    const preparationTime = getValueOrNull(recipeData.recipeInfo.preparationTime)
    const cookingTime = getValueOrNull(recipeData.recipeInfo.cookingTime)
    const portions = getValueOrNull(recipeData.recipeInfo.portions)
    
    const newRecipe = await Recipes.create({
        userId: user.userId,
        title: title,
        websiteName: websiteName,
        recipeUrl: recipeUrl,
        recipeImgUrl: recipeImgUrl,
        preparationTime: preparationTime,
        cookingTime: cookingTime,
        portions: portions, 
    })

    await newRecipe.setStepsLists(await createStepsLists(recipeData, newRecipe))
    await newRecipe.setIngredientsLists(await createIngredientsLists(recipeData, newRecipe))

    newRecipe.setUser(user).then(async () => {
        return await newRecipe.save()
    }) 
  }

  async function createStepsLists(recipeData, newRecipe) {
    const steps = recipeData.steps
    let stepsLists = []
      
    if (isFromType(steps, Object)) {
        for (var title in steps) {
            let stepsList = await createStepsList(steps[title], title, newRecipe)
            stepsLists.push(stepsList)
        } 
    } 
    else if (isFromType(steps, Array)) {
        let stepsList = await createStepsList(steps, null, newRecipe)
        stepsLists.push(stepsList)
    } 

    return stepsLists
  }

  async function createStepsList(steps, title, newRecipe) {
    let stepsArray = []
    let stepsList = await StepsLists.create({
        recipeId: newRecipe.recipeId,
        title: title
    })

    for (var i in steps) { 
        const step = await createStep(stepsList, steps[i])    
        stepsArray.push(step)
    }  
  
    stepsList.setSteps(stepsArray)
    return stepsList
  }

  async function createStep(stepsList, step) {
        return Steps.create({
            stepsListId: stepsList.stepsListId,
            description: step.description
        })
  }

  async function createIngredientsLists(recipeData, newRecipe) {
    const ingredients = recipeData.ingredients
    let ingredientsLists = []

    if (isFromType(ingredients, Object)) {
        for (var title in ingredients) {
            let ingredientsList = await createIngredientsList(ingredients[title], title, newRecipe)
            ingredientsLists.push(ingredientsList)
        }

    } else if (isFromType(ingredients, Array)) {
        let ingredientsList = await createIngredientsList(ingredients, null, newRecipe)
        ingredientsLists.push(ingredientsList)
    }

    return ingredientsLists
  }

  async function createIngredientsList(ingredients, title, newRecipe) {
    let ingredientsArray = []
    let ingredientsList = await IngredientsLists.create({
        recipeId: newRecipe.recipeId,
        title: title
    })
    
    for (var i in ingredients) {
        const ingredient = await createIngredient(ingredientsList, ingredients[i])          
        ingredientsArray.push(ingredient)
    }
    
    ingredientsList.setRecipeIngredients(ingredientsArray)
    return ingredientsList
  }

  async function createIngredient(ingredientsList, ingredient) {
    return RecipeIngredients.create({
        ingredientsListId: ingredientsList.ingredientsListId,
        name: ingredient.name,
        indication: getValueOrNull(ingredient.indication),
        mesure: getValueOrNull(ingredient.mesure),
        quantity: getValueOrNull(ingredient.quantity),
    })
  }

  function getValueOrNull(value) {
      return isEmpty(value) ? null : value.trim()
  }

  async function getUserRecipes(user) {
    let recipes = await Recipes.findAll({
      where: {
        userId: user.userId
      }, 
      include: [StepsLists, IngredientsLists]
    }).catch(e => console.log(e))
    
    return await recipesToJson(recipes) 
  }
  
  async function recipesToJson(recipes) {
    let formatedRecipes = []
  
    await asyncForEach(recipes, async (recipe, i, arr) => {
      let formatedRecipe = recipe.toJson()
      let ingredients = {}
      let steps = {}
  
      // Fetch ingredients list
      await asyncForEach(recipe.IngredientsLists, async (list, i, arr) => {``
        let rawIngredients = await list.getRecipeIngredients()
        ingredients[list.dataValues.title] = rawIngredients.map(ing => ing.toJson())
      })
  
      // Fetch steps list
      await asyncForEach(recipe.StepsLists, async (list, i, arr) => {
        let rawSteps = await list.getSteps() 
        steps[list.dataValues.title] = rawSteps.map(s => s.toJson())
      })
  
      formatedRecipe.ingredients = ingredients
      formatedRecipe.steps = steps
      formatedRecipes.push(formatedRecipe)
    })  
  
    return formatedRecipes
  }

module.exports = router
