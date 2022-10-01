import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBoard from "../../UI/Table/TableBoard";
import Card from "../../UI/Card/Card";
import RemoveForm from "./RemoveForm";
import FlightForm from "../Airline/FlightForm";

const Airlines = (props) => {
  const colNames = [
    "flight id",
    "airline",
    "origin country",
    "destinamtion country",
    "departure time",
    "landing time",
    "remaining tickets",
  ];

  const [flights, setFlights] = useState([]);
  const [updateFlightId, setUpdateFlightId] = useState("");
  const [isRemoveAction, setIsRemoveAction] = useState(false);
  const [isUpdateAction, setIsUpdateAction] = useState(false);
  const [isReturnAction, setIsReturnAction] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/admins/flights/`).then((res) => {
      setFlights(res.data.flights);
    });
  }, []);

  const removeActionHandler = () => {
    setIsUpdateAction(false);
    setIsReturnAction(false);
    setIsRemoveAction(true);
  };

  const updateFlightHandler = (event) => {
    setUpdateFlightId(event.target.value);
  };

  const updateActionHandler = () => {
    setIsRemoveAction(false);
    setIsReturnAction(false);
    setIsUpdateAction(true);
  };

  const returnActionHandler = () => {
    setIsUpdateAction(false);
    setIsRemoveAction(false);
    setIsReturnAction(true);
  };

  const submitRemoveHandler = (delData) => {
    axios
      .delete(`http://localhost:8080/admins/flights/${delData.id}`, {
        data: { delData },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const submitUpdateHandler = (flightData) => {
    const sentFlightData = {
      ...flightData,
      flightId: updateFlightId,
    };
    axios
      .put(
        `http://localhost:8080/admins/flights/${props.username}`,
        sentFlightData
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="container">
        {!isReturnAction && (
          <button
            className="btn btn-outline-info"
            onClick={returnActionHandler}
          >
            Return
          </button>
        )}
        <Card className="">
          {isReturnAction && (
            <button className="btn btn-danger" onClick={removeActionHandler}>
              Remove a Flight
            </button>
          )}
          {isReturnAction && <br />}
          {isReturnAction && (
            <button className="btn btn-success" onClick={updateActionHandler}>
              Update a Flight
            </button>
          )}
          {isRemoveAction && (
            <RemoveForm
              myInput={flights}
              username={props.username}
              pwd={props.pwd}
              onSubmit={submitRemoveHandler}
            />
          )}
          {isUpdateAction && (
            <div className="">
              <label className="text-decoration-underline">
                Select Flight # To Update
              </label>
              <br />
              <br />
              <select
                aria-label="Default select example"
                onChange={updateFlightHandler}
              >
                <option selected value={"0"} />
                {flights.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id}
                  </option>
                ))}
              </select>
              <FlightForm
                username={props.username}
                pwd={props.pwd}
                onSubmit={submitUpdateHandler}
              />
            </div>
          )}
        </Card>
        
        <TableBoard list={flights} tableCol={colNames} />
      </div>
    </React.Fragment>
  );
};

export default Airlines;
