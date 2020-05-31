import React, { useEffect, useState } from 'react';
import './ItemInfo.css';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';





const ItemInfo = (({ Food }) => {
    let history = useHistory();
    function update(id) {
        console.log('update ' + id)
        history.push(`/menu-item/${id}`)
    }

    let [addedToCart, setAddedToCart] = useState(false)
    let [notProcess, setNotProcess] = useState(false)

    function addToCart(id) {
        let username = sessionStorage.getItem("username")
        if (username === null) {
            sessionStorage.setItem("cart", "addCart")
            history.push("/login")
        } else {
            const options = { headers: { authorization: sessionStorage.getItem("token") } }

            axios.post("http://localhost:8086/carts/" + username + "/" + id, null, options).then(
                response => {
                    setAddedToCart(true)
                    setTimeout(() => {
                        setAddedToCart(false)
                    }, 3000);

                    console.log(response)
                }

            ).catch(
                err => {
                    console.log(err)
                    setNotProcess(true)
                    setTimeout(() => {
                        setNotProcess(false)
                    }, 3000);

                }
            )
        }

    }

    let [isAdmin, setIsadmin] = useState(false)
    useEffect(() => {
        console.log(sessionStorage.getItem("role"))
        console.log("ete")
        setIsadmin(isAdmin = sessionStorage.getItem("role") === "ROLE_ADMIN" ? true : false)
    }, [])

    return (
        <div className="card mb-5">
            <img src={Food.imgSrc}
                alt={Food.name} className="card-img-top" height="300px" />
            <div className="card-body">
                <div className="row">
                    <div className="col-8">
                        <span className="float-left">
                            <h4>{Food.name}</h4>
                        </span>
                    </div>
                    <div className="col-4">
                        <span className="float-right">
                            <h4>₹ {Food.price}</h4>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        {Food.active && <span className="badge badge-success float-left" >Active</span>}
                        <span className="text-muted float-left">{Food.category}</span>
                    </div>
                    <div className="col-4">

                        {Food.freeDelivery && <span className="badge badge-primary float-right" >FREE</span>}
                        {Food.freeDelivery && <i className="material-icons float-right" >
                            local_shipping
                </i>}
                    </div>
                </div>
                {addedToCart && <div className="row">
                    <div className="col-12 mt-2">


                        <div className="alert alert-success alert-dissmissible fade show alert-msg">
                            Item added to cart sucessfully
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>

                            </button>
                        </div>

                    </div>


                </div>}
                {notProcess && <div className="row">
                    <div className="col-12 mt-2">


                        <div className="alert alert-danger alert-dissmissible fade show alert-msg">
                            Couldn't process request
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>

                            </button>
                        </div>

                    </div>


                </div>}
                <div className="row mt-3">
                    <div className="col">
                        <div className="row clock">
                            <small><span className="text-muted ml-2"><i className="material-icons  ico ml-auto">
                                schedule
                            </i>Launch </span></small>


                        </div>
                        <div className="row">
                            <span className="text-muted ml-2">{moment(Food.dateOfLaunch).format('DD-MM-YYYY')}</span>
                        </div>

                    </div>




                    {isAdmin && <div className="col text-right">
                        <button className=" btn btn-danger" onClick={() => update(Food.id)}><i className="material-icons">
                            edit
                        </i>Edit</button>
                    </div>}

                    <div >


                        {!isAdmin && <div className="col text-right">
                            <button className=" btn btn-danger" onClick={() => addToCart(Food.id)}><i className="material-icons">
                                shopping_cart
                            </i>Add to Cart</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
});



export default ItemInfo;
