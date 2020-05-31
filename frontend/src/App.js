import React, { useReducer } from 'react';
import './App.css';
import Header from './components/site/Header/Header';
import Login from './components/site/Login/Login';
import Signup from './components/site/Signup/Signup';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from './components/food/Menu/Menu';
import Cart from './components/Cart/Cart';
import ItemEdit from './components/food/ItemEdit/ItemEdit';
import AuthenticatedRoute from './components/site/AuthenticatedRoute';

export const LoginContext = React.createContext();

const initialState = sessionStorage.getItem("role")//===null?"false":"true"
const reducer = (state, action) => {
  switch (action) {
    case 'ROLE_USER': return "ROLE_USER"
    case 'ROLE_ADMIN': return "ROLE_ADMIN"
    case 'no': return null
    default: return initialState
  }
}

function App() {
  let [login, dispatch] = useReducer(reducer, initialState)
  return (

    <LoginContext.Provider value={{ loginState: login, loginDispatch: dispatch }}>
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
            <Route component={Menu} />
          </Switch>



        </Router>

      </div>

    </LoginContext.Provider>

  );
}

export default App;
