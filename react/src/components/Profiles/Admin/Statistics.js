import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import axios from "axios";

const Statistics = (props) => {
  const [flights, setFlights] = useState("");
  const [customers, setCustomers] = useState("");
  const [airlines, setAirlines] = useState("");
  const [users, setUsers] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/admins/flights/`).then((res) => {
      setFlights(res.data.flights.length);
    });
    axios.get(`http://localhost:8080/admins/customers/`).then((res) => {
      setCustomers(res.data.customers.length);
    });
    axios.get(`http://localhost:8080/admins/airlines/`).then((res) => {
      setAirlines(res.data.airlines.length);
    });
    axios.get(`http://localhost:8080/admins/users/`).then((res) => {
      setUsers(res.data.users.length);
    });
  }, []);

  return (
    <Card className="border border-primary">
      <h4 className="">Statistics</h4>
      <br />
      <label className="fw-bold fst-italic text-decoration-underline">Number of Flights:</label>
      <p>{flights}</p>
      <br />
      <label className="fw-bold fst-italic text-decoration-underline">Number of Airlines:</label>
      <p>{airlines}</p>
      <br />
      <label className="fw-bold fst-italic text-decoration-underline">Number of Customers:</label>
      <p>{customers}</p>
      <br />
      <label className="fw-bold fst-italic text-decoration-underline">Total Number of Users:</label>
      <p>{users}</p>
    </Card>
  );
};

export default Statistics;
