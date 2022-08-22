import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBoard from "../../UI/Table/TableBoard";

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
  useEffect(() => {
    axios
      .get(`http://localhost:8080/airlines/flights/${props.username}`)
      .then((res) => {
        setMyFlights(res.data.flights);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <h4 className="">My Flights</h4>
        <TableBoard list={myFlights} tableCol={colNames} />
      </div>
    </React.Fragment>
  );
};

export default MyFlights;
