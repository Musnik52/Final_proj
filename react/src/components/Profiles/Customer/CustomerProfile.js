import React, { useState } from "react";
import Card from "../../UI/Card/Card";
import NewTicket from "./NewTicket";
import UserSettings from "./UserSettings";
import MyTickets from "./MyTickets";
import customer_pic from "../../../Assets/customer_pic.jpg";

const CustomerProfile = (props) => {
  const [isMyTickets, setMyTickets] = useState(false);
  const [isAddTicket, setAddTicket] = useState(false);
  const [isUserSettings, setUserSettings] = useState(false);

  const myTicketsHandler = () => {
    setUserSettings(false);
    setAddTicket(false);
    setMyTickets(true);
  };
  const newTicketHandler = () => {
    setMyTickets(false);
    setUserSettings(false);
    setAddTicket(true);
  };
  const userSettingsHandler = () => {
    setMyTickets(false);
    setAddTicket(false);
    setUserSettings(true);
  };
  return (
    <React.Fragment>
      <Card className="">
        <h4 className="">Welcome, {props.login_name}</h4>
        <img src={customer_pic} alt="customer" />
        <br />
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            onClick={myTicketsHandler}
            type="button"
            className="btn btn-outline-success"
          >
            My Tickets
          </button>
          <button
            onClick={newTicketHandler}
            type="button"
            className="btn btn-outline-success"
          >
            Book a Flight
          </button>
          <button
            onClick={userSettingsHandler}
            type="button"
            className="btn btn-outline-success"
          >
            User Settings
          </button>
        </div>
      </Card>
      {isMyTickets && <MyTickets username={props.login_name}/>}
      {isAddTicket && <NewTicket />}
      {isUserSettings && <UserSettings username={props.login_name} pwd={props.pwd}/>}
    </React.Fragment>
  );
};

export default CustomerProfile;
