import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './core/Home'
import Users from './user/Users'
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
          <Switch>
            <Route exact path="/" name="Home" component={Home} />
            <Route path="/users" name="Users" component={Users} />
          </Switch>
        </DebugRouter>
      );
    }
  }
 export default MainRouter