import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import { read } from "./api-user"
import Typography from "material-ui/Typography"
import List, { ListItemSecondaryAction, ListItemAvatar, Avatar, IconButton } from "material-ui/List"
import { Person } from "material-ui-icons"
import DeleteUser from "./DeleteUser"
import Divider from "material-ui/Divider"
import { Redirect, Link } from 'react-router-dom'
import auth from '../auth/auth-helper'
import Button from 'material-ui/Button'

const styles = theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 2
    }),
    title: {
        marginTop: theme.spacing.unit * 2,
        color: theme.palette.openTitle
    }
})

class Profile extends Component {
    constructor({ match }) {
        super()
        this.state = { user: '', redirectToSigin: false }
        this.match = match
    }

    init = (userId) => {
        const jwt = auth.isAuthenticated()
        read({
            userId: userId
        }, { t: jwt.token }).then((data) => {
            if (data.error)
                this.setState({ redirectToSigin: true })
            else
                this.setState({ user: data })
        })
    }

    componentDidMount = () => {
        this.init(this.match.params.userId)
    }
    componentWillRecieveProps = (props) => {
        this.init(props.match.params.userId)
    }

    render() {
        const { classes } = this.props
        const redirectToSigin = this.state.redirectToSignin
        if (redirectToSigin)
            return <Redirect to='/signin'>
                return(
                    <div>
                    <Paper className={classes.root} elevation={4}>
                        <Typography
                            type="title"
                            className={classes.title}>
                            Profile
                            </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={this.state.user.name}
                                    secondary={this.state.user.email}
                                />
                                {auth.isAuthenticated().user && auth.isAuthenticated().user.id == this.state.userId && (
                                    <ListItemSecondaryAction>
                                        <Link to={"user/edit/" + this.state.user._id}>
                                            <IconButton color="primary">
                                                <Edit />
                                            </IconButton>
                                            <DeleteUser userId={this.state.user._id} />
                                        </Link>
                                    </ListItemSecondaryAction>
                                )}
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={"Joined: " + (new Date(this.state.user.created)).toDateString()} />
                            </ListItem>
                        </List>
                    </Paper>
                </div>
                )
            </Redirect>
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)