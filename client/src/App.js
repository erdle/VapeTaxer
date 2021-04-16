import React, { Component, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import logo from './logo.svg';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import './App.css';
import LeftMenu from './LeftMenu'
import Routes from './Routes'
import Login from "./Content/Login";
import SignUp from "./Content/SignUp";
import Dashboard from "./Content/Dashboard"
import { gethi } from "./services/user"
import PrivateRoute from "./Content/PrivateRoute"
import "@shopify/polaris/dist/styles.css";

export default function App(props) {
    const [loggedIn, setloggedIn] = useState(false);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);

    //TODO notimplemented
    const isAuthenticated = true;
    useEffect(() => {
        gethi().then(data => setloggedIn(data)).catch(err => setError(err.toString()));
    }, []);

    return (
            <Router>
                <Switch>

                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <PrivateRoute isAuthenticated={isAuthenticated} path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>

                    <Route path="/" component={Login} >
                        {
                            !isAuthenticated ?
                                <Redirect to="/login" /> : <Redirect to="/dashboard" />
                        }
                    </Route>

                </Switch>
            </Router>
    );
}