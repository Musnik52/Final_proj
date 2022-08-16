import React from "react";
import Card from "../../UI/Card/Card";
import admin_pic from "../../../Assets/admin_pic.jpg";

const AdminProfile = (props) => {
  return (
    <React.Fragment>
      <Card className="">
        <h4 className="">Welcome, {props.login_name}</h4>
        <img src={admin_pic} alt="customer" />
        <br />
        <div
          className="btn-group-vertical"
          role="group"
          aria-label="Basic example"
        >
          <button type="button" className="btn btn-outline-primary">
            See Airlines
          </button>
          <button type="button" className="btn btn-outline-primary">
            See Tickets
          </button>
          <button type="button" className="btn btn-outline-primary">
            See Flights
          </button>
          <button type="button" className="btn btn-outline-primary">
            See Customers
          </button>
          <button type="button" className="btn btn-outline-primary">
            See Statistics
          </button>
          <button type="button" className="btn btn-outline-primary">
            User Settings
          </button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default AdminProfile;
