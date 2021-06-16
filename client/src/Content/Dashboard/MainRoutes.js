import React from "react"
import { BrowserRouter as Router, Route, Redirect, useParams, Switch } from "react-router-dom"
import Templates from "../Templates"
import TemplateDetails from "../TemplateDetails"
import TaxRates from "./TaxRates/TaxRates"
import Settings from "./Settings/Settings"
import GeneratePDF from './pdf/generatePDF'
import downloadReport from './sdd/downloadReport'

import Stats from "./Stats"
import Products from "./Products/Index"
import Validate from "./Products/Validate"
// import TaxRates from "./TaxRates/Index"
// import Settings from "../Settings"
import { useRouteMatch } from 'react-router-dom'

export default function Routes() {
  const match = useRouteMatch()

  return <Switch>
    <Route exact path={`${match.path}/`} component={Stats} />
    <Route exact path={`${match.path}/Products`} component={Products} />
    <Route exact path={`${match.path}/Settings`} component={Settings} />
    <Route exact path={`${match.path}/TaxRates`} component={TaxRates} />
    <Route exact path={`${match.path}/TaxRates/pdf`} component={GeneratePDF} />
    <Route exact path={`${match.path}/TaxRates/sdd`} component={downloadReport} />
    <Route exact path={`${match.path}/Products/Validate/:id`} component={Validate} />
  </Switch>
}