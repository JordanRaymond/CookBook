import React from 'react'
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const drawerWidth = 240

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
})


const Header = (props) => {
  const { classes, isDrawerOpen } = props

  return (
    <AppBar position="fixed"
     className={classNames(classes.appBar, {
       [classes.appBarShift]: isDrawerOpen,
     })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open/Close drawer"
          onClick={props.handleDrawerOpen}
          className={classNames(classes.menuButton, false && classes.hide)}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" color="inherit" noWrap>
          CookBook
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
  


export default withStyles(styles)(Header)