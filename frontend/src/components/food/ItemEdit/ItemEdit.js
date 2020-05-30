import React, { useState, useEffect } from 'react';
import './ItemEdit.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Form, ErrorMessage, Field, Formik } from 'formik';

const ItemEdit = (() => {

  let [serverError, setServerError] = useState(false);
  let [edited, setEdited] = useState(false);
  let [itemName, setItemName] = useState('');
  let [iprice, setPrice] = useState('');
  let [idate, setIdate] = useState('');
  let [icategory, setIcategory] = useState('');
  let [active, setActive] = useState('');
  let [ifree, setIfree] = useState('');


  let [id, setId] = useState(0)
  let [img, setImg] = useState('')
  // let params = match.params;
  let params = useParams();

  const validate = values => {
    const errors = {};
    if (!values.itemName) {
      errors.itemName = 'Required';
    } else if (values.itemName.length > 15) {
      errors.itemName = 'Must be 15 characters or less';
    } else if (!/^[A-Z ]{1,15}$/i.test(values.itemName)) {
      errors.itemName = 'Item Name should have only Characters';
    }

    if (!values.iprice) {
      errors.iprice = 'Required';
    } else if (!/^[0-9]{1,15}$/i.test(values.iprice)) {
      errors.iprice = 'Price should contain only number and always positive';
    }

    if (!values.idate) {
      errors.idate = 'Required';
    } else if (!moment(values.idate).isValid()) {
      errors.targetDate = 'Enter a valid Date'
    }
    if (!values.icategory) {
      errors.icategory = 'Required';
    }

    return errors;
  };


  const onSubmit = values => {
    console.log(values)

    const data = {
      "id": id,
      "name": values.itemName,
      "price": values.iprice,
      "dateOfLaunch": values.idate,
      "category": values.icategory,
      "active": values.active,
      "freeDelivery": values.ifree,
      "imgSrc": img
    }
   // alert(JSON.stringify(data, null, 2));
    axios.put("http://localhost:8086/menu-items", data).then(
      response => {
        setEdited(true)
        console.log(response)
      }

    ).catch(
      err => {
        console.log(err)
        console.log(err.message)
        if (err)
          setServerError(true)
      }
    )
  }




  useEffect(() => {
    let id = params.id;

    axios.get("http://localhost:8086/menu-items/" + id).then(
      response => {
        console.log(response)


        setId(response.data.id);
        setImg(response.data.imgSrc);
        setItemName(response.data.name);
        setPrice(response.data.price);
        setIdate(moment(response.data.dateOfLaunch).format('YYYY-MM-DD'));
        setIfree(response.data.freeDelivery);
        setIcategory(response.data.category);
        setActive(response.data.active)


      }

    ).catch(
      err => {
        console.log("err", err)
        if (err)
          setServerError(true)
      }
    )
  }, [])

  function changeFreeDelivery(){
    setIfree(!ifree)
    console.log("ch")
  }

  function  changeCategory(event){
    setIcategory(event.target.value)
  }

  return (

    <div className="container">
      <div>
        <h1>Edit Menu Item</h1>
        {edited && <div className="alert alert-success">Edited Successfully</div>}
        {serverError && <div className="alert alert-danger">Server Error</div>}
      </div>
      {!(edited || serverError) &&
        <Formik
          initialValues={{ itemName, iprice, idate, icategory, active, ifree }}
          onSubmit={onSubmit}
          validateOnChange={true}
          validateOnBlur={true}
          validate={validate}
          enableReinitialize={true}
        >
          {
            (props) => (
              <Form>
                <fieldset className="form-group">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">

                      <label htmlFor="itemName">Item Name</label>
                      <Field type="text" className="form-control" id="itemName" name="itemName" />
                      <ErrorMessage name="itemName" component="div"
                        className="validation-error" />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="form-group">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-3">
                      <label htmlFor="iprice">Price</label>
                      <Field type="text" className="form-control" id="iprice" name="iprice" />
                      <ErrorMessage name="iprice" component="div" className="validation-error" />
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-3">
                      <label htmlFor="idate">Date of launch</label>
                      <Field type="Date" className="form-control" id="idate" name="idate" />
                      <ErrorMessage name="idate" component="div" className="validation-error" />
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-3">
                      <div className="form-group">
                        <label htmlFor="icategory">Category</label>
                        <select className="form-control" id="icategory" name="icategory" value={icategory} onChange={(event)=>changeCategory(event)}>
                          <ErrorMessage name="icategory" component="div" className="validation-error" />
                          <option  value="Starter">Starters</option>
                          <option  value="Main Course">Main Course</option>
                          <option  value="Desert">Desert</option>
                          <option value="Drink">Drink</option>

                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-3">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="active">Active</label>


                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">

                          <div className="form-check form-check-inline">

                            <span>
                              <input type="radio" className="form-check-input" checked={active===true} name="active" id="yes" onChange={event=>setActive(!active)} />
                              <label htmlFor="yes" className="form-check-lable">Yes</label>
                              <input type="radio" className="form-check-input" checked={active===false} name="active" id="no" onChange={event=>setActive(!active)} />
                              <label htmlFor="no" className="form-check-lable">No</label>
                            </span>

                          </div>


                        </div>

                      </div>

                    </div>

                  </div>
                </fieldset>
                <fieldset>
                  <div className="row">
                    <div className="col-2">
                      <div className="form-check">
                        <input type="checkbox" class="form-check-input" checked={ifree===true} id="ifree" name="ifree" onChange={()=>changeFreeDelivery()} />
                        <label className="form-check-label" htmlFor="ifree">Free Delivery</label>
                      </div>
                    </div>
                  </div>



                </fieldset>

                <div className="row mt-5 mb-5">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <button className="btn btn-primary " type="submit" >Save</button>
                  </div>
                </div>
              </Form>
            )
          }
        </Formik>

      }


    </div>

  )


});


export default ItemEdit;