import React, {useContext} from 'react'
import * as bs from 'react-bootstrap'
import {Link} from 'react-router-dom'
import AppContext from "./context";
import * as _ from 'lodash'


function HeaderContainer(props) {
  const globalState=useContext(AppContext)
  const {cart}=globalState||{}
  const cartQuantityList=_.values(cart)
  const cartTotalQuantity=_.sum(cartQuantityList)
  return (
    <bs.Navbar variant="dark" expand="lg">
      <Link to="/">
        <bs.Navbar.Brand>
        </bs.Navbar.Brand>
      </Link>
      <bs.Navbar.Toggle aria-controls="basic-navbar-nav" />
      <bs.Navbar.Collapse id="basic-navbar-nav">
        <bs.Nav className="mr-auto">
          <h3 style={{
            color: "white"
          }}>
            <i className="fab fa-accusoft" style={{fontSize: "2rem"}}></i> Arctic Ecommerce
             </h3>_____
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/help" className="nav-link">Help</Link>
          
        </bs.Nav>
        <bs.Nav>
          <Link to="/cart" className="nav-link" style={{marginRight:20}}>
            <i className="fas fa-shopping-cart"></i>
            <span style={{display:'inlineBlock',marginLeft:'10px'}}>{cartTotalQuantity}</span>
          </Link>
          <bs.NavDropdown title="Welcome, Marcus" alignRight>
            <bs.NavDropdown.Item>My Account</bs.NavDropdown.Item>
            <bs.NavDropdown.Divider />
            <bs.NavDropdown.Item href="#action/3.4">Logout</bs.NavDropdown.Item>
          </bs.NavDropdown>
        </bs.Nav>
      </bs.Navbar.Collapse>
    </bs.Navbar>
  );
}

export default HeaderContainer;
