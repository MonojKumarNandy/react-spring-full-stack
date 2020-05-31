import React, { Component } from 'react';
import './Menu.css';
import ItemInfo from '../ItemInfo/ItemInfo';
import axios from 'axios'

//const Menu = () => {
class Menu extends Component {

  constructor(props) {
    super(props)

    this.state = {
      foods: []
    }
  }
  componentDidMount() {

    const options = { headers: { authorization: sessionStorage.getItem("token") } }

    axios.get("http://localhost:8086/menu-items", options).then(
      response => {
        this.setState({ foods: response.data })
        console.log(response)
      }

    ).catch(
      err => console.log("err", err)
    )



  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-5">
          {this.state.foods.map(
            food =>
              <div className="col-12 col-md-6 col-lg-4" key={food.id}>
                <ItemInfo Food={food} />
              </div>
          )
          }
        </div>
      </div>
    )
  }
};


export default Menu;
