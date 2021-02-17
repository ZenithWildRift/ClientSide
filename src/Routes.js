import React from 'react';
import {Route, Switch, BrowserRouter } from "react-router-dom";
import Spectator from './Pages/Spectator/Spectator';

const Routes = () => {
  return ( 
    <BrowserRouter>
      <Switch>
        <Route path="/" exact  component={Spectator} />
      </Switch>
    </BrowserRouter>
   );
}
 
export default Routes;