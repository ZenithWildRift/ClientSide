import React from 'react';
import {Route, Switch, BrowserRouter } from "react-router-dom";
import Characters from './Pages/Characters';
import Create from './Pages/Create';
import Login from './Pages/Login';
import Spectator from './Pages/Spectator/Spectator';
import Team from './Pages/Team';
import * as axios from "./Auth/axios";
import Manage from './Pages/ManageMatch.js';
import Theme from './Pages/Themes';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';

axios.init();

const Routes = () => {
  return ( 
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact  component={Spectator} /> */}
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact  component={Login} />
        <Route path="/signup" exact  component={Signup} />
        <Route path="/create" exact component={Create} />
        {/* <Route path="/team" exact component={Team} /> */}
        <Route path="/characters" exact component={Characters} />
        <Route path="/manage" exact component={Manage} />
        <Route path="/themes" exact component={Theme} />

        <Route path="/match/:id/team/:teamId" exact component={Team} />
        <Route path="/match/:id/spectator" exact component={Spectator} />
      </Switch>
    </BrowserRouter>
   );
}
 
export default Routes;