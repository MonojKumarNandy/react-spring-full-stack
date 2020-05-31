import React, { useState, useEffect } from 'react';

import './Signup.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';


const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  } else if (!/^[A-Z]{1,15}$/i.test(values.firstName)) {
    errors.firstName = 'First Name should have only Characters';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  } else if (!/^[A-Z]{1,15}$/i.test(values.lastName)) {
    errors.lastName = 'Last Name should have only Characters';
  }

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 20)
    errors.username = 'Username cannot exceed 20 characters'
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
    errors.username = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 4) {
    errors.password = 'Must be 4 characters or more';
  }

  if (!values.cnfpassword) {
    errors.cnfpassword = 'Required';
  }
  else if (values.cnfpassword !== values.password) {
    errors.cnfpassword = 'Password and Confirm Password must be Same';
  }

  return errors;
};

const Signup = () => {


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      cnfpassword: ''
    },
    validate,
    onSubmit: values => {
      setLoading(true)

      // alert(JSON.stringify(values, null, 2));
      //alert(values.firstName);
      const data = {
        "username": values.username,
        "firstName": values.firstName,
        "lastName": values.lastName,
        "password": values.password
      }
      //alert(data)
      axios.post("http://localhost:8086/users", data).then(
        response => {
          console.log(response)
          setSignedUp(true)
          setLoading(false)
        }

      ).catch(
        err => {
          setLoading(false)
          console.log(err)
          console.log(err.message)
          if (err.message === 'Request failed with status code 400')
            setuserExists(true)
          else if (err.message === "Network Error")
            setServerError(true)
        }
      )
    },
  });

  let [signedUp, setSignedUp] = useState(false);
  let [userExists, setuserExists] = useState(false);
  let [loading, setLoading] = useState(false);
  let [serverError, setServerError] = useState(false);
  return (

    <div className="row justify-content-center mt-5">
      <div className="col-sm-12 col-md-6 col-lg-6">
        <div className="card">
          <div className="card-header">Signup</div>
          {signedUp && <div className="alert alert-success"> Sucessfully Signed up!!</div>}
          {signedUp && <div > <Link to="/login" className="btn btn-primary">Login</Link></div>}
          {!signedUp && <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              {userExists && <div className="alert alert-danger" role="alert">Username already exists</div>}
              {serverError && <div className="alert alert-danger" role="alert">Server Error</div>}
              {loading && <div className="alert alert-warning" role="alert">Checking
                <div className="spinner-border"><span className="sr-only"> Loading....</span>
                </div>
              </div>}



              <div className="form-group">
                <label htmlFor="username"> Username/Email</label>
                <input type="text" className="form-control" id="username" placeholder="Enter Username" name="username" onChange={formik.handleChange} value={formik.values.username} />

                {formik.errors.username ? <div className="validation-error">{formik.errors.username}</div> : null}
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="form-group ">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" className="form-control" placeholder="Enter First Name" name="firstName"
                      onChange={formik.handleChange} value={formik.values.firstName} />

                    {formik.errors.firstName ? <div className="validation-error">{formik.errors.firstName}</div> : null}



                  </div>
                </div>


                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="form-group ">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" placeholder="Enter Last Name" name="lastName"
                      onChange={formik.handleChange} value={formik.values.lastName} />
                    {formik.errors.lastName ? <div className="validation-error" >{formik.errors.lastName}</div> : null}

                  </div>
                </div>
              </div>



              <div className="row">

                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="form-group ">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="Enter Password" name="password"
                      onChange={formik.handleChange} value={formik.values.password} />
                    {formik.errors.password ? <div className="validation-error" >{formik.errors.password}</div> : null}

                  </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="form-group ">
                    <label htmlFor="cnfassword"> Confirm Password</label>
                    <input type="password" id="cnfassword" className="form-control" placeholder="Enter confirm Password"
                      name="cnfpassword" onChange={formik.handleChange} value={formik.values.cnfpassword} />
                    {formik.errors.cnfpassword ? <div className="validation-error" >{formik.errors.cnfpassword}</div> : null}

                  </div>
                </div>



              </div>



              <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
          </div>}


        </div>
      </div>
    </div>





  );
};


export default Signup;










