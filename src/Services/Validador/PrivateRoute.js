import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, userRole, requiredRoles, ...rest }) {
     console.log("nueva vista")
     console.log("esto es nuevo"+ isAuthenticated,userRole)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          // Si el usuario está autenticado, verifica si tiene el rol necesario
          if (requiredRoles.includes(userRole.role) || userRole.role === 'empleado') {
            return <Component {...props} />;
          }
        }
        // Si no cumple con las condiciones, redirige a la página de inicio de sesión
        return <Redirect to="/" />;
      }}
    />
  );
}

export default PrivateRoute;
