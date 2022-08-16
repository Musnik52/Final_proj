import React from "react";
import Card from "../../UI/Card/Card";
import airline_pic from "../../../Assets/airline_pic.jpg";

const AirlineProfile = (props) => {
  return (
    <React.Fragment>
      <Card className="">
        <h4 className="">Welcome, {props.login_name}</h4>
        <img src={airline_pic} alt="customer" />
        <br />
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-outline-primary">
            My Flights
          </button>
          <button type="button" className="btn btn-outline-primary">
            Create a Flight
          </button>
          <button type="button" className="btn btn-outline-primary">
            User Settings
          </button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default AirlineProfile;
