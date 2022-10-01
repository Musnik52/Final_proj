import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../UI/Button/Button";

const TicketForm = (props) => {
    const [isCounrtySelect, setIsCounrtySelect] = useState(true);
    const [ticketList, setTicketList] = useState([]);
    const [myCountries, setMyCountries] = useState([]);
    const [myTicket, setMyTicket] = useState("");
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
      customerId: enteredCustomerId,
      flightId: myTicket,
    };
    props.onSubmit(ticketData);
  };

  return (
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
            <option selected value={0}>
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

          <label className="control">Enter Flight ID:</label>
          <input
            className="control"
            type="text"
            onChange={ticketChangeHandler}
          />
          <Button className="control" type="submit">
            Add Ticket
          </Button>
        </div>
      )}
    </form>
  );
};

export default TicketForm;
