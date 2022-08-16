import React from "react";
import Card from "../../UI/Card/Card";
import customer_pic from "../../../Assets/customer_pic.jpg";

const CustomerProfile = (props) => {
  return (
    <React.Fragment>
      <Card className="">
        <h4 className="">Welcome, {props.login_name}</h4>
        <img src={customer_pic} alt="customer" />
        <br />
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-outline-success">
            My Tickets
          </button>
          <button type="button" className="btn btn-outline-success">
            Book a Flight
          </button>
          <button type="button" className="btn btn-outline-success">
            User Settings
          </button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default CustomerProfile;
