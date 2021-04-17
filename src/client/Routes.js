import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Characters from './Pages/Characters';
import Create from './Pages/Create';
import Login from './Pages/Login';
import Spectator from './Pages/Spectator/Spectator';
import Team from './Pages/Team';
import * as axios from './Auth/axios';
import Manage from './Pages/ManageMatch';
import Theme from './Pages/Themes';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import PrivateRoute from './Auth/PrivateRoutes';
import Access from './Pages/Acess/Access';

axios.init();

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route path="/" exact  component={Spectator} /> */}
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <PrivateRoute path="/" exact component={Dashboard} />
      <PrivateRoute path="/create" exact component={Create} />
      {/* <Route path="/team" exact component={Team} /> */}
      <PrivateRoute path="/characters" exact component={Characters} />
      <PrivateRoute path="/manage" exact component={Manage} />
      <PrivateRoute path="/manage/:matchId" exact component={Manage} />
      <PrivateRoute path="/themes" exact component={Theme} />
      <PrivateRoute path="/admin" exact component={Access} />

      <Route path="/match/:id/team/:teamId" exact component={Team} />
      <Route path="/match/:id/spectator" exact component={Spectator} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
