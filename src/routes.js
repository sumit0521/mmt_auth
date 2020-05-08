import React from 'react';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import Login from "./component/login/login";
import SignUp from "./component/register/registration";
import App from './App';
const Routes = () => (
    <Router>
           <Route exact path='/' component={App} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
    </Router>
);

export default Routes;