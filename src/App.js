import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from '../src/Components/Home';
import Login from '../src/Components/Login';
import ModalLogin from '../src/Components/ModalLogin';
import NotFound from '../src/Components/NotFound';
import Layout from './Components/Layout';
import CalendarModule from './Components/CalendarModule';
import Certificados from './Components/Certificados';
import PagodeNomina from '../src/Components/PagodeNomina';
import Certificadolaboral from './Components/Certificadolaboral';
import HomeGerente from '../src/Components/HomeGerente';
import CuentaBanco from './Components/CuentaBanco';
import TablaDatosGerente from './Components/TablaDatosGerente';
import TablaUsuarios from './Components/TablaUsuarios';
import PrivateRoute from './Components/PrivateRoute';
function App() {


  return (
   
    <Router>
      <Layout>
      <Switch>
        <PrivateRoute path="/TabladeUsuarios" component={TablaUsuarios} roles={['Administrador']} />
        <PrivateRoute path="/TablaDatosGerente" component={TablaDatosGerente} roles={['Administrador']} />
        <PrivateRoute path="/CuentaBanco" component={CuentaBanco} roles={['Administrador']} />
        <PrivateRoute path="/Gerente" component={HomeGerente} roles={['Administrador']} />
        <PrivateRoute path="/CertificadoLaboral" component={Certificadolaboral} roles={['Empleado']} />
        <PrivateRoute path="/PagodeNomina" component={PagodeNomina} roles={['Empleado']} />
        <PrivateRoute path="/Certificados" component={Certificados} roles={['Empleado']} />
        <PrivateRoute path="/Calendario" component={CalendarModule} roles={['Empleado']} />
        <PrivateRoute path="/modallogin" exact component={ModalLogin} roles={['Administrador']}/>
        <PrivateRoute path="/Home"  component={Home} roles={['Empleado']}/>
        <Route path="/" exact component={Login}/>
        <Route path="*" component={NotFound} />
      </Switch>
      </Layout>
    </Router>
  );
}

export default App;
