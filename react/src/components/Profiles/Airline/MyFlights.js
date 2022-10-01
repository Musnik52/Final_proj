import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBoard from "../../UI/Table/TableBoard";
import Card from "../../UI/Card/Card";
import FlightForm from "./FlightForm";
import RemoveForm from "./RemoveForm";

const MyFlights = (props) => {
  const colNames = [
    "flight id",
    "origin country",
    "destinamtion country",
    "departure time",
    "landing time",
    "remaining tickets",
  ];
  const [myFlights, setMyFlights] = useState([]);
  const [updateFlightId, setUpdateFlightId] = useState("");
  const [isRemoveAction, setIsRemoveAction] = useState(false);
  const [isUpdateAction, setIsUpdateAction] = useState(false);
  const [isReturnAction, setIsReturnAction] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/airlines/flights/${props.username}`)
      .then((res) => {
        setMyFlights(res.data.flights);
      });
  }, []);

  const updateFlightHandler = (event) => {
    setUpdateFlightId(event.target.value);
  };

  const updateActionHandler = () => {
    setIsRemoveAction(false);
    setIsReturnAction(false);
    setIsUpdateAction(true);
  };

  const removeActionHandler = () => {
    setIsUpdateAction(false);
    setIsReturnAction(false);
    setIsRemoveAction(true);
  };

  const returnActionHandler = () => {
    setIsUpdateAction(false);
    setIsRemoveAction(false);
    setIsReturnAction(true);
  };

  const submitRemoveHandler = (flightData) => {
    axios
      .delete(`http://localhost:8080/airlines/flights/${props.username}`, {
        data: { flightData },
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
        `http://localhost:8080/airlines/flights/${props.username}`,
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
              myFlights={myFlights}
              username={props.username}
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
                {myFlights.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id}
                  </option>
                ))}
              </select>
              <FlightForm
                username={props.username}
                onSubmit={submitUpdateHandler}
              />
            </div>
          )}
        </Card>
        <TableBoard list={myFlights} tableCol={colNames} />
      </div>
    </React.Fragment>
  );
};

export default MyFlights;
