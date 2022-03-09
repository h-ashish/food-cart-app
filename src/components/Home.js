import React from "react";
import bgimage from "../assets/bgimage.jpg";
import Products from "./MenuItems";

function Home() {
  return (
    <div className="hero ">
      <div className="card bg-dark text-black border-0">
        <img
          src={bgimage}
          className="card-img"
          alt="Background image"
          height="550px"
        />
        <div className="card-img-overlay">
          <div className="container">
            <h5 className="card-title display-3 fw-bolder mb-0 mt-5">
              Delicious food <br /> for your cravings
            </h5>
            <p className="card-text lead fs-2">
              We make fresh and healthy meals every order{" "}
            </p>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
}

export default Home;
