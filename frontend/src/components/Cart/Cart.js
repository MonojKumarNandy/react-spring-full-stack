import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = (() => {

  let [cartItem, setCartItem] = useState(null);
  let [items, setItems] = useState([]);
  let [cartEmpty, setCartEmpty] = useState(false);
  // let [serverError, setServerError] = useState(false);


  useEffect(() => {
    let username = sessionStorage.getItem("username")
    const options = { headers: { authorization: sessionStorage.getItem("token") } }

    axios.get("http://localhost:8086/carts/" + username, options).then(
      response => {
        console.log(response)
        console.log(response.data)
        setCartItem(response.data)
        setItems(response.data.items)
        console.log(cartItem)
      }

    ).catch(
      err => {
        console.log(err)
        if (err.message === 'Request failed with status code 404')
          setCartEmpty(true)

      }
    )


  }, [])


  function decrementCartItemQuantity(id) {
    let username = sessionStorage.getItem("username")
    let clearCartItem = false
    const options = { headers: { authorization: sessionStorage.getItem("token") } }

    axios.delete("http://localhost:8086/carts/" + username + "/" + id + "/" + clearCartItem, options).then(
      response => {
        console.log(response)
        console.log(response.data)
        setCartItem(response.data)
        setItems(response.data.items)
        console.log(cartItem)
      }

    ).catch(
      err => {
        console.log(cartItem)
        console.log(err)
        if (err.message === 'Request failed with status code 404') {
          //setCartItem(null)
          setCartEmpty(true)
        } //else if (err.message === 'Request failed with status code 401')
        // setServerError(true)
      }
    )
  }

  function incrementCartItemQuantity(id) {
    let username = sessionStorage.getItem("username")
    const options = { headers: { authorization: sessionStorage.getItem("token") } }

    axios.post("http://localhost:8086/carts/" + username + "/" + id, null, options).then(
      response => {
        console.log(response)
        console.log(response.data)
        setCartItem(response.data)
        setItems(response.data.items)
        console.log(cartItem)
      }

    ).catch(
      err => {
        console.log(err)

      }
    )
  }


  function deleteCartItemQuantity(id) {

    let username = sessionStorage.getItem("username")

    let clearCartItem = true
    const options = { headers: { authorization: sessionStorage.getItem("token") } }

    axios.delete("http://localhost:8086/carts/" + username + "/" + id + "/" + clearCartItem, options).then(
      response => {
        console.log(response)
        console.log(response.data)
        setCartItem(response.data)
        setItems(response.data.items)
        console.log(cartItem)
      }

    ).catch(
      err => {
        console.log(cartItem)
        console.log(err)
        if (err.message === 'Request failed with status code 404') {
          //setCartItem(null)
          setCartEmpty(true)
        }
      }
    )
  }


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header">
             <h1> Cart</h1>
            </div>
            {(!cartItem || cartEmpty) && <div className="alert alert-secondary mt-2">
              No items in cart. Use 'Add to Cart' option in product list
             </div>}

            {/* {serverError && <div className="alert alert-danger mt-2">
              Server Error
             </div>} */}



            {((cartItem !== null) && !cartEmpty) && <div className="list-group">

              {
                items.map(
                  item =>
                    <div className="list-group-item" key={item.id}>

                      <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <span className="text-muted">
                            <h3>{item.foodItem.name}</h3>
                          </span>

                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                          <div className="row justify-content-end">
                            <div className="justify-content-end">
                              ₹ {item.quantity * item.foodItem.price}

                            </div>
                            <div className=" justify-content-end">
                              <i className="material-icons cursor" onClick={() => deleteCartItemQuantity(item.id)}>
                                delete_forever
                                      </i>


                            </div>
                          </div>
                          <div className="row justify-content-end">
                            <button onClick={() => decrementCartItemQuantity(item.id)}>-</button>
                            <input type="text" readOnly className="width-adjust" value={item.quantity} />
                            <button onClick={() => incrementCartItemQuantity(item.id)}>+</button>
                          </div>

                        </div>


                      </div>
                    </div>
                )
              }

              <div className="list-group-item">
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <span>
                      <h3>Total</h3>
                    </span>

                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6 d-flex justify-content-end">
                    <h3> {cartItem.total}</h3>

                  </div>

                </div>
              </div>




            </div>
            }



          </div>


          <div className="row justify-content-center mb-5">
            <div className="col-12 col-md-12 col-lg-6">
              <Link className="btn btn-primary mt-5" to="/menu"> Continue with shopping</Link>
            </div>
          </div>


        </div>
      </div>


    </div>

  )
});



export default Cart;
