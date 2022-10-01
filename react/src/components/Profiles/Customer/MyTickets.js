import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBoard from "../../UI/Table/TableBoard";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";

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
  const [removeTicketId, setRemoveTicketId] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/customers/tickets/${props.username}`)
      .then((res) => {
        setTickets(res.data.tickets);
      });
  }, []);

  const removeTicketHandler = (event) => {
    setRemoveTicketId(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const ticketData = {
      ticketId: removeTicketId,
    };
    axios
      .delete(`http://localhost:8080/customers/tickets/${props.username}`, {
        data: { ticketData },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="container">
        <TableBoard list={myTickets} tableCol={colNames} />
        <Card className="">
          <form onSubmit={submitHandler}>
            <label className="text-decoration-underline">
              Select Ticket # To Remove
            </label>
            <br />
            <br />
            <select
              aria-label="Default select example"
              onChange={removeTicketHandler}
            >
            <option selected value={"0"}/>
              {myTickets.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id}
                </option>
              ))}
            </select>
            <Button className="control" type="submit">
              Remove Ticket
            </Button>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default MyTickets;
