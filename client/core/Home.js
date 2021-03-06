import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import seashellImg from '../assets/img/seemee.jpg'
import { Link } from 'react-router-dom'

const styles = theme=> ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing.unit * 5
    },
    title: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`, 
        color: theme.palette.text.secondary
    },
    media: {
        minHeight: 330
    }
})

class Home extends Component {
    render() {
        const {classes} = this.props
        return (
            <div>
                <Card className={classes.card}>
                    <Typography type="headline" component="h2" className={classes.title}>
                       Home Page
                    </Typography>
                    <CardMedia className={classes.media} image={seashellImg}
                    title="Seemee Sample Image"/>
                    <CardContent>
                        <Typography type="body1" component="p">
                        Welcome to the SeeMee Skeleton Home Page <Link to="/users">Users</Link>
                        <br/>
                        <Link to="/signup">Seeker Signup</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)