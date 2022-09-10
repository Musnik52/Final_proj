import React, { useState } from "react";
import Button from "../../UI/Button/Button";

const NewFlight = (props) => {
  const [removeFlightId, setRemoveFlightId] = useState([]);
  const myFlights = props.myFlights;

  const removeFlightHandler = (event) => {
    setRemoveFlightId(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const flightData = {
      username: props.username,
      password: props.pwd,
      id: removeFlightId,
    };
    props.onSubmit(flightData);
    setRemoveFlightId("");
  };

  return (
    <form onSubmit={submitHandler}>
      <label className="text-decoration-underline">
        Select Flight # To Remove
      </label>
      <br />
      <br />
      <select
        aria-label="Default select example"
        onChange={removeFlightHandler}
      >
        <option selected value={"0"} />
        {myFlights.map((c) => (
          <option key={c.id} value={c.id}>
            {c.id}
          </option>
        ))}
      </select>
      <Button className="control" type="submit">
        Remove Flight
      </Button>
    </form>
  );
};

export default NewFlight;
