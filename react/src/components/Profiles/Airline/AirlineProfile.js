import React, { useState } from "react";
import Card from "../../UI/Card/Card";
import NewFlight from "./NewFlight";
import UserSettings from "./UserSettings";
import MyFlights from "./MyFlights";
import airline_pic from "../../../Assets/airline_pic.jpg";
import axios from "axios";
import "./AirlineProfile.css";

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

  const submitUpdateHandler = (updateData) => {
    axios
      .put(`http://localhost:8080/airlines/${props.username}`, updateData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="container__im4">
        <Card className="border border-primary">
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
        {isAddFlight && <NewFlight username={props.login_name} />}
        {isUserSettings && (
          <UserSettings
            username={props.login_name}
            onUpdateAirline={submitUpdateHandler}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default AirlineProfile;
