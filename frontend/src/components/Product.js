import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosService from "../service/AxiosService";
import { useLocalState } from "../util/useLocalStroge";

const Product = () => {
  const { id } = useParams();
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axiosService(`/api/auth/products/${id}`)
      .then((response) => {
        // console.log(response.data);
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, []);

  const Loading = () => {
    return <h1>Loading...</h1>;
  };

  const addToCart = () => {
    axios.get(`/cart/add/${id}`, {
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
  };

  const ShowProduct = () => {
    return (
      <>
        <h3 className="text-center mb-5 fw-bold">{product.name}</h3>
        <div className="col-md-6 text-center">
          <img src={product.imgUrl} alt={product.name} />
        </div>

        <div className="col-md-6 mt-5">
          <p className="text-black-50">{product.description}</p>
          <h4 className="text-center mt-5">${product.price}</h4>
        </div>
        <div className="mt-3">
          <button
            className="btn btn-outline-secondary px-3 py-2 pull-right"
            onClick={() => (window.location.href = "/")}
          >
            Go Back
          </button>
          <button
            className="btn btn-outline-info px-3 py-2 me-2 pull-right"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
