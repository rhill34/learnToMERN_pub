import { Typography, IconButton } from "material-ui"
import { Person, ArrowForward } from "material-ui-icons"

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
        if (data.error)
            console.log(data.error)
        else
            this.setState({users: data})
    })
}

render() {
    const {classes} = this.props
    return(
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
