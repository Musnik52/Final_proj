import React from "react";
import "./About.css";
import airlock_logo from "../../Assets/airlock.png";
import Award from "../../Assets/award.jpg";

const About = () => {
  return (
    <div className="a">
      <div className="a-left">
        <div className="a-card bg"></div>
        <div className="a-card">
          <img src={airlock_logo} alt="airlock logo" className="a-img" />
        </div>
      </div>
      <div className="a-right">
        <h1 className="a-title">About Airlock</h1>
        <p className="a-sub">
          Airlock is the biggest company to ever come out of the Boris Group
          LTD's brightest minds. In just 4 months since its conception, Airlock
          managed to provide over 4 billion passengers the utmost comfort, fun
          and efficient business and pleasure transactions (traveling-wise!)
        </p>
        <p className="a-desc">
          "Give me Airlock tickets or give me death!" -Plato
        </p>
        <div className="a-award">
          <img src={Award} alt="" className="a-award-img" />
          <div className="a-award-texts">
            <h4 className="a-award-title">Inter-dimentional Time Traveler Awards 2064</h4>
            <p className="a-award-desc">
              Winner of the soon-to-be time travel compatition
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
