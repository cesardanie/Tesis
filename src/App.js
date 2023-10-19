import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from '../src/Components/Home';
import Login from '../src/Components/Login';
import ModalLogin from '../src/Components/ModalLogin';
import NotFound from '../src/Components/NotFound';
import Layout from './Components/Layout';
function App() {


  return (
   
    <Router>
      <Layout>
      <Switch>
        
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
