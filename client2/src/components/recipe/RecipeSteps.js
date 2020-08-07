import React, {Fragment} from 'react'

 function RecipeSteps({recipe}) {
     return (
        <div className="recipes-steps">
            <h1>Steps</h1>
            {recipe && recipe.stepsLists.map(stepsList => (
                <Fragment>
                    <h4 className="ml-2">{stepsList?.title}</h4>
                    <ol className="">
                        {stepsList.steps.map(step => (
                            <li>{step.description}</li>
                        ))}
                    </ol>
                </Fragment>
                ))
            }
        </div>
    )       
}

export default RecipeSteps