import React from 'react'
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

const drawerWidth = 240

const styles = theme => ({
  appBar: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    flexGrow: 1,
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
  titleGrow: {
    flexGrow: 1
  }
})

const shouldDisplayDrawer = (location) => (
   location.pathname === '/login' || location.pathname === '/register'
)

const Header = (props) => {
  const { classes, isDrawerOpen, isAuth } = props
  const hideDrawerButton = shouldDisplayDrawer(props.location)

  return (
    <AppBar 
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: isDrawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open/Close drawer"
          onClick={() => props.handleDrawerOpen()}
          className={classNames(classes.menuButton, hideDrawerButton && classes.hide)}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" color="inherit" className={classes.titleGrow} noWrap>
          CookBook
        </Typography>
        <Button color="inherit" className={classNames(!isAuth && classes.hide)} onClick={props.logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}
  


export default withRouter(withStyles(styles)(Header))