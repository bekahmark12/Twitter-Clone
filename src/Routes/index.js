import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile"

const Routes = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Profile}/>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login}/>
        </Switch>
    </Router>
  );
}

export default Routes;