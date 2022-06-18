import React, {useState, useEffect} from "react";
import * as ReactBootStrap from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import { useLocalState } from "../util/useLocalStroge";
import axios from "axios";
import axiosService from "../service/AxiosService";

const NavBar = () => {

  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <div>
      <ReactBootStrap.Navbar bg="white" expand="md" className="shadow-sm">
        <ReactBootStrap.Container>
          <ReactBootStrap.Navbar.Brand href="/home" className="fs-4 py-3">
          <i className="fa fa-coffee me-2 fa-sm"></i>
            Starbucks
          </ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
          <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
            <ReactBootStrap.Nav className="mx-auto">
              <ReactBootStrap.Nav.Link href="/menu">
              Menu
              </ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link href="/about">
                About
              </ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link href="/contact">
                Contact
              </ReactBootStrap.Nav.Link>
            </ReactBootStrap.Nav>
            <div className="buttons">
              <a href="/login" className="btn btn-outline-dark">
                <i className="fa fa-sign-in me-2"></i> Login
              </a>
              <a href="/register" className="btn btn-outline-dark ms-2">
                <i className="fa fa-user-plus me-2"></i> Register
              </a>
              <a href="/cart" className="btn btn-outline-dark ms-2">
                <i className="fa fa-shopping-cart me-2"></i> Cart
              </a>
            </div>
          </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Container>
      </ReactBootStrap.Navbar>
    </div>
  );
};

export default NavBar;
