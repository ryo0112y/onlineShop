import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import axiosService from "../service/AxiosService";

const Products = () => {
  
  const [productsData, setProductsData] = useState([]);
  const [filterProductData, setFilterProductData] = useState(productsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosService("/api/auth/products")
      .then((response) => {
        setProductsData(response.data);
        setFilterProductData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, []);

  const filterProduct = (cat) => {
    const updatedList = productsData.filter((x) => x.category === cat);
    setFilterProductData(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-2 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilterProductData(productsData)}
          >
            All
          </button>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => filterProduct("COFFEE")}
          >
            Coffee
          </button>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => filterProduct("TEA")}
          >
            Tea
          </button>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => filterProduct("FRAPPUCCINO")}
          >
            Frappuccino
          </button>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => filterProduct("FOOD")}
          >
            Food
          </button>
        </div>
        {filterProductData.map((product) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 mt-3" key={product.id}>
              <div className="card h-100 text-center p-4">
                <img
                  src={product.imgUrl}
                  className="card-img-top"
                  alt={product.description}
                  height="250px"
                />
                <div className="card-body">
                  <p className="card-text lead fw-bold mt-2">{product.name}</p>
                  <p className="card-text lead ">${product.price}</p>
                  <NavLink
                    to={`/products/${product.id}`}
                    className="btn btn-outline-dark"
                  >
                    Buy Now
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-3 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1
              className="display-6 fw-bolder
            text-center"
            >
              Menu
            </h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <h1>Loading</h1> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
