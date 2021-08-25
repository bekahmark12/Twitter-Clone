import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import ProfileNotLoggedIn from "../pages/profile/ProfileNotLoggedIn";

const Routes = () => {
  let loggedIn = localStorage.getItem('loggedIn')
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={loggedIn ? Profile : ProfileNotLoggedIn}/>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login}/>
          <Route path="/feed" component={Profile}/>
        </Switch>
    </Router>
  );
}

export default Routes;