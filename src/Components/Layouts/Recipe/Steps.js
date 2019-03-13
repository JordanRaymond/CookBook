import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  txtContent: {
    paddingTop: theme.spacing.unit * 2,
  },
})


const Steps = (props) => {
  const { classes } = props
  const { steps } = props

  return (
            <Fragment>
              <Typography variant="h3">
                Steps
              </Typography>
            {
              Array.isArray(steps) 
              ? steps.map((steps) => (
                  <Typography variant="body2" key={steps} >
                  {steps}
                  </Typography>
                ))
              : Object.entries(steps).map(([title, steps]) => (
                    <Fragment key={title}>
                      <Typography variant="h5" className={classes.txtContent}>
                        {title}
                      </Typography>
                    {
                      steps.map((step) => (
                          <Typography variant="body2" key={step} gutterBottom >
                          {step}
                          </Typography>
                      ))
                    }
                    </Fragment>          
              ))
            }
          </Fragment>          
  )
}
  


export default withStyles(styles)(Steps)