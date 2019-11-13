import React, { Fragment, Component } from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Informations, ImgDialog } from '../../Layouts'
import '../../Recipe/Recipe.css'

const styles = theme => ({
    txtContent: {
        padding: theme.spacing.unit * 3,
      },
})

class RecipeHeader extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            isImgDialogOpen: false,
        }
    }

    handleImgDialog = () => {
        this.setState({ isImgDialogOpen: !this.state.isImgDialogOpen })
    }

    renderStyle = (recipeImgUrl) => (
        recipeImgUrl ? ({
          style: {
            backgroundImage: `url(${recipeImgUrl})`,
          }
        }) : ({})
    )

    render() {
        const { recipeImgUrl, title, recipeInfo, websiteName} = this.props
    
        return (  
            <Fragment>
                <div className={'titleBackground'} {...this.renderStyle(recipeImgUrl)}>
                    <div className={'titleContainer'}>
                        <img src={recipeImgUrl} className='recipeImg' alt='Recipe' onClick={this.handleImgDialog}/>
                        <div className={'rightImgContainer'}>
                            <Typography variant="h4" className={'typo'} >
                                {title}
                            </Typography>
                            {title.length > 0 && <hr className={'typo'}/>}
                                
                            <Informations recipeInfo={recipeInfo} className={'typo'} />
                        </div>
                    </div>
                </div>             
                <Typography variant="caption">
                    {`from ${websiteName}`}        
                </Typography>
                <ImgDialog 
                    recipeImgUrl={recipeImgUrl} 
                    isImgDialogOpen={this.state.isImgDialogOpen} 
                    handleImgDialog={this.handleImgDialog}
                />
            </Fragment>          
        )
    }
}
  


export default withStyles(styles)(RecipeHeader)