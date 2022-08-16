import React, { useEffect, useState } from "react";
import FlightBoard from "./FlightBoard";
import axios from "axios";

const Flights = (props) => {
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
        <FlightBoard list={flights} />
      </div>
    </React.Fragment>
  );
};

export default Flights;
