import React, { useState } from "react";
import Card from "../../UI/Card/Card";
import Flights from "./Flights";
import Airlines from "./Airlines";
import Customers from "./Customers";
import Statistics from "./Statistics";
import UserSettings from "./UserSettings";
import admin_pic from "../../../Assets/admin_pic.jpg";

const AdminProfile = (props) => {
  const [isAirlines, setAirlines] = useState(false);
  const [isFlights, setFlights] = useState(false);
  const [isCustomers, setCustomers] = useState(false);
  const [isStatistics, setStatistics] = useState(false);
  const [isUserSettings, setUserSettings] = useState(false);

  const airlinesHandler = () => {
    setUserSettings(false);
    setCustomers(false);
    setFlights(false);
    setStatistics(false);
    setAirlines(true);
  };
  const flightsHandler = () => {
    setUserSettings(false);
    setCustomers(false);
    setStatistics(false);
    setAirlines(false);
    setFlights(true);
  };
  const customersHandler = () => {
    setUserSettings(false);
    setFlights(false);
    setStatistics(false);
    setAirlines(false);
    setCustomers(true);
  };
  const statisticsHandler = () => {
    setUserSettings(false);
    setCustomers(false);
    setFlights(false);
    setAirlines(false);
    setStatistics(true);
  };
  const userSettingsHandler = () => {
    setCustomers(false);
    setFlights(false);
    setStatistics(false);
    setAirlines(false);
    setUserSettings(true);
  };

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
          <button
            onClick={airlinesHandler}
            type="button"
            className="btn btn-outline-primary"
          >
            View Airlines
          </button>
          <button
            onClick={flightsHandler}
            type="button"
            className="btn btn-outline-primary"
          >
            View Flights
          </button>
          <button
            onClick={customersHandler}
            type="button"
            className="btn btn-outline-primary"
          >
            View Customers
          </button>
          <button
            onClick={statisticsHandler}
            type="button"
            className="btn btn-outline-primary"
          >
            View Statistics
          </button>
          <button
            onClick={userSettingsHandler}
            type="button"
            className="btn btn-outline-primary"
          >
            User Settings
          </button>
        </div>
      </Card>
      {isAirlines && <Airlines />}
      {isFlights && <Flights />}
      {isCustomers && <Customers />}
      {isStatistics && <Statistics />}
      {isUserSettings && <UserSettings />}
    </React.Fragment>
  );
};

export default AdminProfile;
