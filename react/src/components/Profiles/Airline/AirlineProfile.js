import React, { useState } from "react";
import Card from "../../UI/Card/Card";
import NewFlight from "./NewFlight";
import UserSettings from "./UserSettings";
import MyFlights from "./MyFlights";
import airline_pic from "../../../Assets/airline_pic.jpg";

const AirlineProfile = (props) => {
  const [isMyFlights, setMyFlights] = useState(false);
  const [isAddFlight, setAddFlight] = useState(false);
  const [isUserSettings, setUserSettings] = useState(false);

  const myFlightsHandler = () => {
    setUserSettings(false);
    setAddFlight(false);
    setMyFlights(true);
  };
  const newFlightHandler = () => {
    setMyFlights(false);
    setUserSettings(false);
    setAddFlight(true);
  };
  const userSettingsHandler = () => {
    setMyFlights(false);
    setAddFlight(false);
    setUserSettings(true);
  };
  return (
    <React.Fragment>
      <Card className="">
        <h4 className="">Welcome, {props.login_name}</h4>
        <img src={airline_pic} alt="customer" />
        <br />
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            onClick={myFlightsHandler}
            type="button"
            className="btn btn-outline-primary"
          >
            My Flights
          </button>
          <button
            onClick={newFlightHandler}
            type="button"
            className="btn btn-outline-primary"
          >
            Create a Flight
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
      {isMyFlights && <MyFlights username={props.login_name} />}
      {isAddFlight && <NewFlight />}
      {isUserSettings && <UserSettings />}
    </React.Fragment>
  );
};

export default AirlineProfile;
