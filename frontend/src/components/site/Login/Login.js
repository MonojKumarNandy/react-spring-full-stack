import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import AuthenticationService from '../AuthenticationService';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }

  if (!values.password)
    errors.password = 'Required';


  return errors;
};


const Login = (() => {

  useEffect(()=>{
    console.log("useeffect login")
    if(sessionStorage.getItem("username"))
    history.push("/menu")
  },[])

  let history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      setLoading(true)
      setServerError(false)
      setIvalid(false)
      AuthenticationService.handleLogin(values.username, values.password).then(
        response => {
          //alert(response.data)
          console.log(response)
          setLoading(false)
          setIvalid(false)
          setServerError(false)
          AuthenticationService.registerSuccessfulLoginForJwt(values.username, response.data.role, response.data.token)
          history.push("/menu")
        }

      ).catch(
        err => {
          console.log(err)
          setLoading(false)
          if (err.message === 'Request failed with status code 401')
            setIvalid(true)
          else if (err.message = 'Network Error')
            setServerError(true)

        }
      )
      // alert(values.username)
      //alert(JSON.stringify(values, null, 2));
    },
  });

  let [invalid, setIvalid] = useState(false)
  let [serverError, setServerError] = useState(false)
  let [loading, setLoading] = useState(false);
  
  return (
    <div className="container mt-5">


      <div className="row justify-content-center">

        <div className="col-sm-12 col-md-6 col-lg-6">
          <div className="card">
            <div className="card-header">
              Login
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                {invalid && <div className="alert alert-danger" > Invalid Username /Password </div>}
                {serverError && <div className="alert alert-danger" > Server Error </div>}
                {loading && <div className="alert alert-warning" role="alert">Checking
                <div className="spinner-border"><span className="sr-only"> Loading....</span>
                  </div>
                </div>}
                <div className="alert alert-danger" >Please Login  befor adding item to cart. </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" placeholder="Enter Username" name="username" onChange={formik.handleChange} value={formik.values.username} />
                  {formik.errors.username ? <div className="validation-error">{formik.errors.username}</div> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="password"> Password</label>
                  <input type="password" id="password" className="form-control" placeholder="Enter Password" name="password"
                    onChange={formik.handleChange} value={formik.values.password} />
                  {formik.errors.password ? <div className="validation-error" >{formik.errors.password}</div> : null}

                </div>
                <div className="row mt-5">
                  <div className="col-sm-4 col-md-4 col-lg-4 ">
                    <button className="btn btn-primary" type="submit">
                      Login

                       </button>

                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4 ">
                    New Here ?<Link to="/signup">
                      Signup
                  </Link>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>





  )

});


export default Login;
