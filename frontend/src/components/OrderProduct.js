import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Products from "./Products";

const OrderProduct = () => {
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [orderedProduct, setOrderedProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getOrderedProduct();
  }, []);

  const getOrderedProduct = () => {
    axios.get(`/order/get/${id}`).then((response) => {
      setOrderData(response.data);
      //   console.log(response.data.orderedProducts);
      setUserData(response.data.user);
      setOrderedProduct(response.data.orderedProducts);
      console.log(response.data);
    });
  };

  const ShowOrderedProduct = () => {
    return (
      <div className="text-center">
        <div className="card">
          <div className="card-body">
            <Link to={`/user/${userData.id}`} className="link-danger">
              {userData.username}
            </Link>
            <h6 className="card-subtitle mb-2 text-muted">
              BOUGHT AT: <strong>{orderData.boughtAt}</strong>
            </h6>
            <p className="card-text"></p>
            {orderedProduct.map((product) => {
              return (
                <div className="container" key={product.id}>
                  <h1>
                    {product.name} × {product.quantity}{" "}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return <ShowOrderedProduct />;
};

export default OrderProduct;
