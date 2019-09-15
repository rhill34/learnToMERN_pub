/**
 * Menu Component 
 */
import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import Button from 'material-ui/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'

/**
 * Highlights the link that matches the current location.
 * To indicate the current location of the app. 
 * @param {JSON} history 
 * @param {String} path 
 */
const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#ff4081'}
  else
    return {color: '#ffffff'}
}
/**
 * Navigation bar functionality, with the withRouter HOC 
 */
const Menu = withRouter(({history}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography type="title" color="inherit">
        MERN Skeleton
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
          <HomeIcon/>
        </IconButton>
      </Link>
      <Link to="/users">
        <Button style={isActive(history, "/users")}>Users</Button>
      </Link>
      {/* Only shows if the user is not authenticated */}
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {/* Only shows if the user is authenticated */}
      {
        auth.isAuthenticated() && (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My SeeMee Seeker Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.signout(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
    </Toolbar>
  </AppBar>
))

export default Menu