import React, { useEffect, useState } from "react";
import TableBoard from "../UI/Table/TableBoard";
import axios from "axios";

const Flights = (props) => {
  const colNames = [
    "id",
    "airline",
    "origin country",
    "destination country",
    "departure time",
    "landing time",
    "remaining tickets",
  ];

  const [flights, setFlights] = useState([]);
  useEffect(() => {
     axios.get(`http://localhost:8080/flights`).then((res) => {
      console.log(res.data.flights);
      setFlights(res.data.flights);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <br />
        <h4 className="center">Flights Board</h4>
        <TableBoard list={flights} tableCol={colNames} />
      </div>
    </React.Fragment>
  );
};

export default Flights;
