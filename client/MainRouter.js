import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "./auth/PrivateRoute"
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import Menu from './core/Menu'
/**DEBUG: Issue including this import */
// import Users from './user/Users'
class DebugRouter extends Router {
    constructor(props){
      super(props);
      console.log('initial history is: ', JSON.stringify(this.history, null,2))
      this.history.listen((location, action)=>{
        console.log(
          `The current URL is ${location.pathname}${location.search}${location.hash}`
        )
        console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
      });
    }
  }
/**
 * Adding a home route to MainRouter 
 */
//  class MainRouter extends Component {
//      render() {
//          return (
//             <Router>
//                 <div>
//                     <Switch>
//                         <Route path="/" component={Home} />
//                         {/* DEBUG: Issues with rendering added route */}
//                         {/* <Route path="/users" component={Users} /> */}
//                     </Switch>
//             </div>
//          </Router>
//          )
//      }
//  }

 class MainRouter extends Component {
    render() {
      return (
        <DebugRouter>
          <Menu/>
          <Switch>
            <Route exact path="/" name="Home" component={Home} />
            <Route path="/users" name="Users" component={Users} />
            <Route path="/signup" component={Signup}/>
            <Route path="/signin" component={Signin}/>
            {/* The PrivateRoute needs to be immediately before the Profile route to avoid confusion of the authorized user or reference user */}
            <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
            <Route path="/user/:userId" component={Profile}/>
          </Switch>
        </DebugRouter>
      );
    }
  }
 export default MainRouter