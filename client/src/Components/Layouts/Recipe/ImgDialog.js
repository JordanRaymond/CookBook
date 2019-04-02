import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent } from '@material-ui/core'

const styles = {
  recipeDialogContent: {
    display: "flex"
  },
  recipeDialogImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain"
  }
}

const ImgDialog = props => {
  const { classes } = props

  return (
    <Dialog aria-labelledby="Recipe image" open={props.isImgDialogOpen} onClose={props.handleImgDialog}>
      <DialogContent className={`recipeDialog ${classes.recipeDialogContent}`}>
        <img
          src={props.recipeImgUrl}  
          className={classes.recipeDialogImg}
          alt="Recipe"
        />
      </DialogContent>
    </Dialog>
  )
}

ImgDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ImgDialog)