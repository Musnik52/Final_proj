import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import axios from "axios";
import Button from "../../UI/Button/Button";
import TableBoard from "../../UI/Table/TableBoard";

const NewTicket = (props) => {
  const colNames = [
    "flight id",
    "airline",
    "origin country",
    "destination country",
    "departure time",
    "landing time",
    "remaining tickets",
  ];

  const [myCountries, setMyCountries] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const [myTicket, setMyTicket] = useState("");
  const [isCounrtySelect, setIsCounrtySelect] = useState(true);
  const [enteredOriginCountryId, setEnteredOriginCountryId] = useState("");
  const [enteredDestinationCountryId, setEnteredDestinationCountryId] =
    useState("");
  const [enteredCustomerId, setCustomerId] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/countries`).then((res) => {
      setMyCountries(res.data.countries);
    })
    .catch((err) => console.log(err));
    axios
      .get(`http://localhost:8080/customers/${props.username}`)
      .then((res) => {
        setCustomerId(res.data.customer.id);
      })
      .catch((err) => console.log(err));
  }, []);

  const originCountryIdHandler = (event) => {
    setEnteredOriginCountryId(event.target.value);
  };
  const destinationCountryIdHandler = (event) => {
    setEnteredDestinationCountryId(event.target.value);
  };

  const formHandler = async (event) => {
    setIsCounrtySelect(!isCounrtySelect);
    axios
      .get(
        `http://localhost:8080/flights/${enteredOriginCountryId}/${enteredDestinationCountryId}`
      )
      .then((res) => {
        setTicketList(res.data.flight);
      })
      .catch((err) => console.log(err));
  };

  const ticketChangeHandler = (event) => {
    setMyTicket(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const ticketData = {
      username: props.username,
      password: props.pwd,
      customerId: enteredCustomerId,
      flightId: myTicket,
    };
    axios
      .post(
        `http://localhost:8080/customers/tickets/${props.username}`,
        ticketData
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    return props.onAddedTicket();
  };

  return (
    <React.Fragment>
      <Card className="container">
        <h4 className="">New Ticket</h4>
        <form onSubmit={submitHandler}>
          {isCounrtySelect && (
            <div className="">
              <label className="control text-decoration-underline">
                Origin Country
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={originCountryIdHandler}
              >
                <option selected value={"*"}>
                  Fly From: All Countries
                </option>
                {myCountries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <label className="control text-decoration-underline">
                Destination Country
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={destinationCountryIdHandler}
              >
                <option selected value={"*"}>
                  Fly To: All Countries
                </option>
                {myCountries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <br />
              <Button onClick={formHandler}>Show Tickets</Button>
            </div>
          )}
          {!isCounrtySelect && (
            <div className="container">
              <button
                className="control btn btn-outline-info"
                onClick={formHandler}
              >
                Back to Country Select
              </button>

              <label className="control">Select Flight ID:</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={ticketChangeHandler}
              >
                <option selected value={"0"}/>
                {ticketList.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.id}
                  </option>
                ))}
              </select>
              <Button className="control" type="submit">
                Add Ticket
              </Button>
            </div>
          )}
        </form>
      </Card>
      <div className="container">
        {!isCounrtySelect && (
          <TableBoard list={ticketList} tableCol={colNames} />
        )}
      </div>
    </React.Fragment>
  );
};

export default NewTicket;
