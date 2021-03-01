import jwtDecode from 'jwt-decode';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './helper';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = isAuthenticated() && jwtDecode(isAuthenticated().token);

    return (
      <Route
        {...rest}
        render={props => (user.admin ? (
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
  