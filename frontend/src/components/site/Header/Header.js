import React, { useState, useContext } from 'react';
import './Header.css';
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from '../../../App';




const Header = (() => {
  let history = useHistory();

  // let [loggedIn, setLoggedIn] = useState(false)//(sessionStorage.getItem("username") !== null ? true : false)
  // let [isAdmin, setIsadmin] = useState(false)//(sessionStorage.getItem("role") === "ROLE_ADMIN" ? true : false)
  const loginContext = useContext(LoginContext)
  let loggedIn = loginContext.loginState === null ? false : true
  let isAdmin = loginContext.loginState === "ROLE_ADMIN" ? true : false
  const onSignOut = () => {
    console.log("Logout")

    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cart");
    loginContext.loginDispatch('no')
    //setLoggedIn(false)
    //setIsadmin(false)
    history.push("/login")



  }





  return (



    <nav className="navbar navbar-expand-md navbar-dark bg-dark">

      <Link className=" navbar-brand">
        <i className="material-icons">
          local_dining
                  </i>
           Shopping

  </Link>
      <button className="navbar-toggler" data-toggle="collapse" data-target="#content">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="content">
        {/* <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <Link to="/" className="nav-link"> Menu Item</Link>
          </li>
          {<li className="nav-item" ><Link to="/signup" className="nav-link"> Signup</Link></li>}
          {<li className="nav-item" ><Link to="/cart" className="nav-link"> Cart</Link></li>}
          {<li className="nav-item" ><Link to="/login" className="nav-link"> Log In</Link></li>}
          {<li className="nav-item"><Link className="nav-link"><i className="material-icons">
            perm_identity
            </i>John</Link></li>}
          {<li className="nav-item cursor"><Link className="nav-link" onClick={onSignOut}> Log Out</Link></li>}
        </ul> */}

        {/* <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <Link to="/" className="nav-link"> Menu Item</Link>
          </li>
          { sessionStorage.getItem("username")===null && <li className="nav-item" ><Link to="/signup" className="nav-link"> Signup</Link></li>}
          {sessionStorage.getItem("username")!==null && sessionStorage.getItem("role")==='ROLE_USER' && <li className="nav-item" ><Link to="/cart" className="nav-link"> Cart</Link></li>}
          { sessionStorage.getItem("username")===null && <li className="nav-item" ><Link to="/login" className="nav-link"> Log In</Link></li>}
          { sessionStorage.getItem("username")!==null && <li className="nav-item"><Link className="nav-link"><i className="material-icons">
            perm_identity
            </i>John</Link></li>}
          {sessionStorage.getItem("username")!==null && <li className="nav-item cursor"><Link className="nav-link" onClick={onSignOut}> Log Out</Link></li>}
        </ul> */}

        <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <Link to="/" className="nav-link"> Menu Item</Link>
          </li>
          {!loggedIn && <li className="nav-item" ><Link to="/signup" className="nav-link"> Signup</Link></li>}
          {(loggedIn && !isAdmin) && <li className="nav-item" ><Link to="/cart" className="nav-link"> Cart</Link></li>}
          {!loggedIn && <li className="nav-item" ><Link to="/login" className="nav-link"> Log In</Link></li>}
          {loggedIn && <li className="nav-item"><Link className="nav-link"><i className="material-icons">
            perm_identity
  </i>John</Link></li>}
          {loggedIn && <li className="nav-item cursor"><Link className="nav-link" onClick={onSignOut}> Log Out</Link></li>}
        </ul>


      </div>
    </nav>







  )

});





export default Header;
