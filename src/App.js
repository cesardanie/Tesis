import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from '../src/Services/Validador/PrivateRoute';
import Home from '../src/Components/Home';
import Login from '../src/Components/Login';
import ModalLogin from '../src/Components/ModalLogin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Recuperar el token almacenado en el localStorage
    const userToken = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    console.log(role, userToken);
    // Verificar si el token existe (el usuario está autenticado)
    if (userToken) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  const onLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleAuthentication = (token, role) => {
    setIsAuthenticated(!!token);
    setUserRole(role);
  };


  return (
    <Router>
      <Switch>
      <Route path="/" exact>
      <Login onLoginSuccess={onLoginSuccess} handleAuthentication={handleAuthentication} />
        </Route>
        <Route path="/modallogin" exact component={ModalLogin} />

        <PrivateRoute
        path="/Home"
        exact
        component={Home}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        requiredRoles={['empleado']}
      />
      </Switch>
    </Router>
  );
}



export default App;
