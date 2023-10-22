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
function App() {


  return (
   
    <Router>
      <Layout>
      <Switch>
        <Route path ='/TablaDatosGerente' component={TablaDatosGerente}/>
        <Route path ='/CuentaBanco' component={CuentaBanco}/>
        <Route path ='/Gerente' component={HomeGerente}/>
        <Route path ='/CertificadoLaboral' component={Certificadolaboral}/>
        <Route path ='/PagodeNomina' component={PagodeNomina}/>
        <Route path="/Certificados"  component={Certificados} />
        <Route path="/Calendario"  component={CalendarModule} />
        <Route path="/modallogin" exact component={ModalLogin} />
        <Route path="/Home"  component={Home} />
        <Route path="/" exact component={Login}/>
        <Route path="*" component={NotFound} />
      </Switch>
      </Layout>
    </Router>
  );
}

export default App;
