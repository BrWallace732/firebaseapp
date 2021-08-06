import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Inicio from './components1/Inicio';
import Admin from './components1/Admin';
import Login from './components1/Login';
import Menu from './components1/Menu';

function App() {
  return (
  <div className="container" >
    <Router>
      <Menu></Menu>
      <Switch>
        <Route exact path='/' component={Inicio}></Route>
        <Route path='/admin' component={Admin}></Route>
        <Route path='/login' component={Login}></Route>
      </Switch>
    </Router>


  </div>
  );
}

export default App;
