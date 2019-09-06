import React, { Component } from "react";
// import { Route, Switch } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Home from './core/Home'
// import Users from './user/Users'
/**
 * Adding a home route to MainRouter 
 */

 class MainRouter extends Component {
     render() {
         return (<div>
             <Switch>
                 <Route exact path="/" component={Home}/>
                 {/* Issues with rendering added route */}
                 {/* <Route path="/users" component={Users}/> */}
             </Switch>
         </div>)
     }
 }
 export default MainRouter