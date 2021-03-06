import jwtDecode from 'jwt-decode';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './helper';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = isAuthenticated() && jwtDecode(isAuthenticated());
    return (
      <Route
        {...rest}
        render={props => ((user.admin || user.staff) ? (
            <Component {...props} />// Bring components from routes
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          ))
        }
      />
    );
  }


  export default PrivateRoute;
  