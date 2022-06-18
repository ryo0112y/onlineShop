import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const OrderUser = () => {
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [orderedProduct, setOrderedProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios.get(`/order/get/${id}`).then((response) => {
      setOrderData(response.data);
      //   console.log(response.data.orderedProducts);
      setUserData(response.data.user);
      setOrderedProduct(response.data.orderedProducts);
      console.log(response.data);
    });
  };

  const ShowUser = () => {
    return (
      <div className="text-center">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {userData.firstName} {userData.lastName}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">{userData.username}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{userData.address}</h6>
            <p className="card-text"></p>
            <Link to={`/order-product/${orderData.id}`} className="link-danger">
              User Order
            </Link>
          </div>
          <div className="text-right">
          <a href="/orders" class="link-secondary text-right">Order list</a>
          </div>
        </div>
      </div>
    );
  };

  const OrderList = () =>{
    return (
      <div>
        
      </div>
    )
  }

  return <ShowUser />;
};

export default OrderUser;
