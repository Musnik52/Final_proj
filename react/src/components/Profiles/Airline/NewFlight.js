import React from "react";
import Card from "../../UI/Card/Card";
import axios from "axios";
import FlightForm from "./FlightForm";

const NewFlight = (props) => {
  const submitHandler = (flightData) => {
    axios
      .post(
        `http://localhost:8080/airlines/flights/${props.username}`,
        flightData
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <Card className="">
        <h4 className="">New Flight</h4>
        <FlightForm
          username={props.username}
          pwd={props.pwd}
          onSubmit={submitHandler}
        />
      </Card>
    </React.Fragment>
  );
};

export default NewFlight;
