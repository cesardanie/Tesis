// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthServiceToken from '../Services/AuthServiceToken';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLoggedIn = AuthServiceToken.isLoggedIn();
      const userRole = AuthServiceToken.getRole();

      // Verificar si el usuario está autenticado
      if (!isLoggedIn) {
        // Redirigir a la página de inicio de sesión si no está autenticado
        return <Redirect to="/" />;
      }

      // Verificar si se especificaron roles y si el usuario tiene el rol necesario
      if (roles && roles.length > 0 && !roles.includes(userRole)) {
        // Redirigir a una página de acceso no autorizado o a donde desees
        return <Redirect to="/unauthorized" />;
      }

      // Renderizar el componente si pasa todas las verificaciones
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
