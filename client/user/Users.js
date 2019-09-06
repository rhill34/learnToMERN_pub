import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Typography, IconButton } from "material-ui"
import List from 'material-ui/List'
import {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import ArrowForward from "material-ui-icons/ArrowForward"
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Person from 'material-ui-icons/Person'
import {Link} from 'react-router-dom'
import {list} from './api-user'

const styles = theme => ({
    root: theme.mixins.gutters({
      padding: theme.spacing.unit,
      margin: theme.spacing.unit * 5
    }),
    title: {
      margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.openTitle
    }
  })
/**
 * User Component
 */
class Users extends Component {
    state = { 
        users: [] 
    }

/**
 * To fetch the list of Users from the backend and load the users into the component by updating the state
 */
    componentDidMount = () => {
        list().then((data) => {
            if (data.error){
                console.log(data.error)
            }else{
                this.setState({users: data})
            }
        })
    }

    render() {
        const {classes} = this.props
        return (
          <Paper className={classes.root} elevation={4}>
            <Typography type="title" className={classes.title}>
              All Users
            </Typography>
            <List dense>
             {this.state.users.map((item, i) => {
              return <Link to={"/user/" + item._id} key={i}>
                        <ListItem button>
                          <ListItemAvatar>
                            <Avatar>
                              <Person/>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={item.name}/>
                          <ListItemSecondaryAction>
                          <IconButton>
                              <ArrowForward/>
                          </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                     </Link>
                   })
                 }
            </List>
          </Paper>
        )
      }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired
  }
  
  export default withStyles(styles)(Users)