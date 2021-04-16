import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Content/Login";
import MainRoutes from "./Content/Dashboard/MainRoutes"


export default function Routes() {
  return <Switch>
    <Route path="/login" component={Login} />
    <MainRoutes isLoggedIn={false} />
  </Switch>
}
