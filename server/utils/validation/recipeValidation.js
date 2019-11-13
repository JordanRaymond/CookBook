const { Steps } = require('../../models')
const { isValidUrl, isEmpty, isObjEmpty, isText, isFromType, isAlphaNumeric} = require('./validation')
const DESCRIPTION_MAX_LENGTH = Steps.descriptionMaxLength
const DEFF_MAX_LENGTH = 255

function isTitleValid(title) {
    if(isEmpty(title)) return false

    if(isFromType(title, String)) {
        if(title.trim().length > DEFF_MAX_LENGTH) return false
        if(!isAlphaNumeric(title)) return false

        return true
    }

    return false
}

function isWebsiteNameValid(websiteName) {
    if(isEmpty(websiteName)) return false
    
    if(isFromType(websiteName, String)) {
        // if(websiteName.trim().length == 0) return false
        if(!isAlphaNumeric(websiteName)) return false
        if(websiteName.trim().length > DESCRIPTION_MAX_LENGTH) return false

        return true
    }

    return false
}

function isRecipeUrlValid(recipeUrl) {
    if(isEmpty(recipeUrl)) return true
    
    if(isFromType(recipeUrl, String)) {
        if(isValidUrl(recipeUrl)) return true
        if(recipeUrl.trim().length > DEFF_MAX_LENGTH) return false
    }

    return false
}

function isRecipeImgUrlValid(imgUrl) {
    if(isEmpty(imgUrl)) return true

    if(isFromType(imgUrl, String)) {
        if(isValidUrl(imgUrl)) return true   
        if(imgUrl.trim().length > DEFF_MAX_LENGTH) return false
    }
    
    return false
}

function areRecipeInfoValid(recipeInfos) {
    if(!isObjEmpty(recipeInfos)) {
        for (var param in recipeInfos) { 
            let recipeInfo = recipeInfos[param]

            if(isEmpty(recipeInfo)) return false
            if(!isText(recipeInfo)) return false
            if(recipeInfo.trim().length > DEFF_MAX_LENGTH) return false
        }     
    }

    return true
}

function isValideTitle(title) {
    if(!isFromType(title, String)) return false
    if(isEmpty(title) || !isText(title)) return false

    return true
}

function areRecipeIngredientsValid(ingredients) {
    if(!isObjEmpty(ingredients)) {
        // That mean you have multiple ingredients list with tittle
        if(isFromType(ingredients, Object)) {
            for (var title in ingredients) { 
                //Title
                if(!isValideTitle(title)) return false

                if(isFromType(ingredients[title], Array)) {
                    for (var i in ingredients[title]) {
                        if(!isIngredientValid(ingredients[title][i])) return false 
                    }  
                } 
            }     
        } else if(isFromType(ingredients, Array)) {
            for (var i in ingredients) {
                if(!isIngredientValid(ingredients[i])) return false 
            }  
        } else return false
    }

    return true
}

function areRecipeStepsValid(steps) {
    if(!isObjEmpty(steps)) {
        // That mean you have multiple steps list with tittles
        if(isFromType(steps, Object)) {
            for (var title in steps) {
                if(!isValideTitle(title)) return false

                if(isFromType(steps[title], Array)) {
                    for (var i in steps[title]) { 
                        if(!isStepValid(steps[title][i])) return false 
                    }  
                }
            }     
        } 
        else if(isFromType(steps, Array)) {
            for (var i in steps) { 
                if(!isStepValid(steps[i])) return false 
            }  
        } else return false
    }

    return true
}

// TODO: validate unit 
function isIngredientValid(ingredient) {
    for(var prop in ingredient) {
        let value = ingredient[prop]

        if(isFromType(value, String) || isFromType(value, Number)) {
            if(prop == "name" && isEmpty(value)) return false

            if(isEmpty(value)) continue
            
            if(String(value).length > DEFF_MAX_LENGTH) return false
            if(!isText(value)) return false
        } 
        else return false
    }

    return true
}

function isStepValid(step) {
    for(var prop in step) {
        let value = step[prop]

        if(isFromType(value, String) || isFromType(value, Number)) {
            if(prop == "description") {
                if(isEmpty(value)) return false
                if(String(value).length > DESCRIPTION_MAX_LENGTH) return false
            }

            if(isEmpty(value)) continue
            if(!isText(value)) return false
        } 
        else return false
    }

    return true
}


function validateRecipeInputsForm(recipeData) {
    const { 
        title, 
        websiteName, 
        recipeUrl, 
        recipeImgUrl, 
        recipeInfo, 
        ingredients, 
        steps
    } = recipeData

    return isTitleValid(title) 
        && isWebsiteNameValid(websiteName) 
        && isRecipeUrlValid(recipeUrl)
        && isRecipeImgUrlValid(recipeImgUrl)
        && areRecipeInfoValid(recipeInfo)
        && areRecipeIngredientsValid(ingredients)
        && areRecipeStepsValid(steps)
}

module.exports = validateRecipeInputsForm