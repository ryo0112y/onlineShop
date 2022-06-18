import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, NavLink, Row } from "react-bootstrap";
import axiosService from "../service/AxiosService";

const User = () => {
  const [orders, setOrders] = useState([]);
  const [filterOrders, setFilterOrders] = useState(orders);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false); 
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axiosService("/order/get/list")
      .then((response) => {
        setOrders(response.data);
        setFilterOrders(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  const checkBox = () =>{
    console.log("hello")
  }

  const Loading = () => {
    return (
      <>
        <h1>This page is only available for admin</h1>
      </>
    );
  };

  const ShowUsers = () => {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Check</th>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">User Details</th>
              <th scope="col">Ordered Product</th>
              <th scope="col">Ordered At</th>
            </tr>
          </thead>

          {filterOrders.map((order) => {
            return (
              <tbody key={order.id}>
                <tr>
                  <input type="checkbox" onClick={checkBox}/>
                  <td>{order.id}</td>
                  <td>{order.user.username}</td>
                  <td><Link to={`/user/${order.id}`} className="link-primary">Show User</Link></td>
                  <td><Link to={`/order-product/${order.id}`} className="link-primary">Show Product</Link></td>
                  <td>{order.boughtAt}</td>
                </tr>
              </tbody>
            );
          })}
        
        </table>
      </div>
    );
  };

  const searchOrders = (keyword) => {

    setSearchInput(keyword);

    if(keyword !== ''){
      const results = orders.filter((order) =>{
        return Object.values(order.user.username).join('').toLowerCase().includes(keyword.toLowerCase());
      })
      setFilterOrders(results);
    }
    else{
        setFilterOrders(orders);
    }
  }

  return (
    <div className="container mt-5">
      <div>
        <Row>
          <Col>
            <h1>Order List</h1>
          </Col>
          <Col>
            <input icon="search" placeholder="Search by Username..." onChange={(e) => searchOrders(e.target.value)} />
          </Col>
        </Row>
      </div>
      {loading ? <Loading /> : <ShowUsers />}
    </div>
  );
};

export default User;
