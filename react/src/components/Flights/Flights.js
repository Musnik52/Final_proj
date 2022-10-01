import React, { useEffect, useState } from "react";
import TableBoard from "../UI/Table/TableBoard";
import TimeFilter from "./TimeFilter";
import axios from "axios";
import "./Flights.css";

const Flights = () => {
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
  const [isReset, setIsReset] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [departureTime, setDeparturTime] = useState(0);
  const [landingTime, setLandingTime] = useState(0);
  const [landingTimeFilter, setLandingTimeFilter] = useState(false);
  const [departureTimeFilter, setDepartureTimeFilter] = useState(false);

  useEffect(() => {
    if (departureTime == 0 && landingTime == 0) {
      axios.get(`http://localhost:8080/flights`).then((res) => {
        setFlights(res.data.flights);
      });
    } else if (departureTime != 0 && landingTime == 0) {
      axios
        .post(`http://localhost:8080/flights/dfilter/`, {
          departure: departureTime,
        })
        .then((res) => {
          setFlights(res.data.flights);
        });
    } else{
      axios
        .post(`http://localhost:8080/flights/lfilter/`, {
          landing: landingTime,
        })
        .then((res) => {
          setFlights(res.data.flights);
        });
    }
  }, [isReset, departureTime, landingTime]);

  const resetFilterHandler = () => {
    setIsReset(!isReset);
    setDepartureTimeFilter(false);
    setLandingTimeFilter(false);
    setIsFilter(false);
    setDeparturTime(0);
    setLandingTime(0);
  };

  const departureFilterHandler = (departurTime) => {
    setDeparturTime(Number(departurTime));
  };

  const landingFilterHandler = (landingTime) => {
    setLandingTime(Number(landingTime));
  };

  const filterDepartureHandler = () => {
    setIsFilter(true);
    setDepartureTimeFilter(true);
    setLandingTimeFilter(false);
  };

  const filterLandingHandler = () => {
    setIsFilter(true);
    setLandingTimeFilter(true);
    setDepartureTimeFilter(false);
  };

  return (
    <React.Fragment>
      <div className="container__im">
        <br />
        <h3 className="center__headline">Flights Board</h3>
        {!isFilter && (
          <button
            className="btn btn-outline-primary"
            onClick={filterDepartureHandler}
          >
            Filter By Departure
          </button>
        )}
        <br /> <br />
        {!isFilter && (
          <button
            className="btn btn-outline-success"
            onClick={filterLandingHandler}
          >
            Filter By Landing
          </button>
        )}
        {!isFilter && <br />}
        {isFilter && (
          <button
            className="btn btn-outline-warning"
            onClick={resetFilterHandler}
          >
            Reset Filter
          </button>
        )}
        <br />
        {departureTimeFilter && (
          <TimeFilter
            type="Departure"
            onChangeFilter={departureFilterHandler}
          />
        )}
        {landingTimeFilter && (
          <TimeFilter type="Landing" onChangeFilter={landingFilterHandler} />
        )}
        <TableBoard list={flights} tableCol={colNames} />
      </div>
    </React.Fragment>
  );
};

export default Flights;
