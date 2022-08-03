import React from "react";
import "./LandingPage.css";

const LandingPage = (props) => {
  return (
    <div className="LandingPage">
      <img src={props.img} alt="Travel" className="LandingPage__image" />
      <h1 className="LandingPage__title">Airlock</h1>
      {" "}
      <h6 className="LandingPage__title2">Run Wild, Fly Safe.</h6>
    </div>
  );
};

export default LandingPage;