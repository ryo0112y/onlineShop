import axios from "axios";
import React, { useState, useEffect } from "react";
import axiosService from "../service/AxiosService";
import { useLocalState } from "../util/useLocalStroge";

const Cart = () => {
  const value = 0;
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axiosService("/cart", jwt)
      .then((response) => {
        setUserData(response.data.carts);
        // setCart(response.data.cart.products);
        // console.log(response.data.cart.products);
        setCart(response.data.carts);
        console.log(response.data.carts);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  const Loading = () => {
    return <h1>Loading...</h1>;
  };

  const addItem = (id) => {
    axios(`/cart/add/product/${id}`)
    .then(response =>{
      console.log(response.data);
      window.location.href = "/cart";
    })
    .catch(err =>{
      console.log(err);
    });
  }

  const removeItem = (id) => {
    axios.get(`/cart/remove/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then(response =>{
      console.log(response.data);
      window.location.href = "/cart";
    })
    .catch(err =>{
      console.log(err);
    });
  }

  const calculatePrice = (price, qry) =>{

  }

  const payment = () =>{
    axiosService("/order/payment", jwt)
    .then((response) =>{
      console.log(response.data);
      window.location.href = "/home";
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  const Cart = () => {
    return (
      <>
        <div className="container mt-5 ">
        <h4 className="text-end text-muted">{cart.username}</h4>
          {cart.map((product, value) => {
            return (
              <div className="card mt-3 text-center" key={product.id}>
                <div className="card-body">
                  <h5 className="card-title mt-3">
                    {product.product.name}
                  </h5>
                  <h6 className="card-subtitle mb-2 mt-3 text-muted">
                    ${product.product.price} × {product.quantity} = ${product.product.price * product.quantity} 
                  </h6>
                  <div className="text-end">
                    <a className="btn btn-info me-2" onClick={() => addItem(product.id)}>
                      + Add
                    </a>
                    <a className="btn btn-danger" onClick={() => removeItem(product.id)}>
                      - Remove
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="container mt-4">
            <div className="row">
              <div className="col">
              <h4>
                <u>TOTAL</u>
              </h4>
              <h5> ${totalPrice}</h5>
              </div>
              <div className="col text-end mt-3">
                <button type="button" className="btn btn-primary" onClick={payment}>
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowCart = () => {
    return (
      <>
        {cart ? (
          <Cart />
        ) : (
          <div className="container mt-5">There is nothing in this cart</div>
        )}
      </>
    );
  };

  return (
    <div className="container">{loading ? <Loading /> : <ShowCart />}</div>
  );
};

export default Cart;
