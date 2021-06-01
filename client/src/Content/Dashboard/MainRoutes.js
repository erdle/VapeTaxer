import React from "react"
import { BrowserRouter as Router, Route, Redirect, useParams, Switch } from "react-router-dom"
import Templates from "../Templates"
import TemplateDetails from "../TemplateDetails"
import Users from "../Users"
import ViewUser from "../ViewUser"

import Stats from "./Stats"
import Products from "./Products/Index"
import { useRouteMatch } from 'react-router-dom'

export default function Routes() {
  const match = useRouteMatch()

  return <Switch>
    <Route exact path={`${match.path}/`} component={Stats} />
    <Route exact path={`${match.path}/Products`} component={Products} />
  </Switch>
}