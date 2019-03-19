import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';

const styles = {
  recipeDialogImg: {
    objectFit: 'contain'
  }
};

const ImgDialog = (props) => {

    return (
      <Dialog 
        aria-labelledby="Recipe image" 
        open={props.isImgDialogOpen}
        onClose={props.handleImgDialog}
      >
        <DialogContent className={'recipeDialog'}>
          <img src={props.recipeImgUrl} className={'recipeDialogImg'} />        
        </DialogContent>
      </Dialog>
    )
}

ImgDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgDialog);