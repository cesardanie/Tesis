// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../Services/AuthServiceToken';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.isLoggedIn() && roles.includes(AuthService.getRole()) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
