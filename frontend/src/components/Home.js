import React from "react";
import LatestProducts from "./LatestProducts";

const Home = () => {
  return (
    <div>
      <div className="hero">
        <div className="card bg-dark text-white border-0 mt-5">
          <img
            src="https://www.logogenie.net/images/articles/starbucks-logo1.jpg"
            className="card-img"
            alt="Background"
          />
        </div>
      </div>
      <LatestProducts />
    </div>
  );
};

export default Home;
