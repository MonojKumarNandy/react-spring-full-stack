import React from 'react';
import './App.css';
import Header from './components/site/Header/Header';
import Login from './components/site/Login/Login';
import Signup from './components/site/Signup/Signup';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from './components/food/Menu/Menu';
import Cart from './components/Cart/Cart';
import ItemEdit from './components/food/ItemEdit/ItemEdit';
import AuthenticatedRoute from './components/site/AuthenticatedRoute';

function App() {
  return (
    <div className="App">
      

      <Router>
      <div className="sticky-top"> <Header /></div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup" component={Signup} />


          <AuthenticatedRoute path="/cart">
            <Cart />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/menu-item/:id" component={ItemEdit} />

          
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/">
            <Menu />
          </Route>
          <Route component={Menu}/>
        </Switch>



      </Router>

    </div>
  );
}

export default App;
