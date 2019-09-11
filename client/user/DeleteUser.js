import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import DeleteIcon from 'material-ui-icons/Delete'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import auth from './../auth/auth-helper'
import { remove } from './api-user.js'
import { Redirect, Link } from 'react-router-dom'

class DeleteUser extends Component {
    //Begins with the redirect and open both false for the Confirmation Dialog box not to render first 
    state = {
        redirect: false,
        open: false
    }
    clickButton = () => {
        //Opens the dialog box
        this.setState({ open: true })
    }
    deleteAccount = () => {
        //make sure user is authenticated
        const jwt = auth.isAuthenticated()
        //call the delete fetch method 
        remove({
            userId: this.props.userId
        }, { t: jwt.token }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                auth.signout(() => console.log('deleted'))
                this.setState({ redirect: true })
            }
        })
    }
    //If the users cancel the delete action the dialog box closes
    handleRequestClose = () => {
        this.setState({ open: false })
    }
    
    render() {
        const redirect = this.state.redirect
        if (redirect) {
            return <Redirect to='/' />
        }
        return (<span>
            <IconButton aria-label="Delete" onClick={this.clickButton} color="secondary">
                <DeleteIcon />
            </IconButton>

            <Dialog open={this.state.open} onClose={this.handleRequestClose}>
                <DialogTitle>{"Delete Account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to delete your account.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleRequestClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={this.deleteAccount} color="secondary" autoFocus="autoFocus">
                        Confirm
          </Button>
                </DialogActions>
            </Dialog>
        </span>)
    }
}
DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired
}
export default DeleteUser