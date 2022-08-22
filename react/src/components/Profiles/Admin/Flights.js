import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBoard from "../../UI/Table/TableBoard";

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
  useEffect(() => {
    axios.get(`http://localhost:8080/admins/flights/`).then((res) => {
      setFlights(res.data.flights);
    });
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <h4 className="">Flights</h4>
        <TableBoard list={flights} tableCol={colNames} />
      </div>
    </React.Fragment>
  );
};

export default Airlines;
