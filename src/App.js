import logo from './logo.svg';
import './App.css';
import Login from '../src/Components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ModalLogin from '../src/Components/ModalLogin';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/ModalLogin" exact component={ModalLogin} />
      </Switch>
    </Router>
  );
}

export default App;
