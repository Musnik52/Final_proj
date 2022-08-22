import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBoard from "../../UI/Table/TableBoard";

const MyTickets = (props) => {
  const colNames = [
    "flight id",
    "airline",
    "origin country",
    "destination country",
    "departure time",
    "landing time",
  ];
  const [myTickets, setTickets] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/customers/tickets/${props.username}`)
      .then((res) => {
        setTickets(res.data.tickets);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <h4 className="">My Tickets</h4>
        <TableBoard list={myTickets} tableCol={colNames} />
      </div>
    </React.Fragment>
  );
};

export default MyTickets;
