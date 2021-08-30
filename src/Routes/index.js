import React from "react";
import Master from "./Master"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import ProfileNotLoggedIn from "../pages/profile/ProfileNotLoggedIn";
import UserInfo from "../pages/about/about"

const Routes = () => {
  let loggedIn = localStorage.getItem('loggedIn')
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={loggedIn ? Profile : ProfileNotLoggedIn}/>
          <Master path="/home" component={Home} />
          <Route path="/login" component={Login}/>
          <Master path="/feed" component={Profile}/>
          <Master path='/user-info' component={UserInfo}/>
        </Switch>
    </Router>
  );
}

export default Routes;