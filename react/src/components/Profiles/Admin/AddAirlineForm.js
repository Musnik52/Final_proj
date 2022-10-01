import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../UI/Button/Button";
import "./UserUpdate.css";

const AddAirlineForm = (props) => {
  const [myCountries, setMyCountries] = useState([]);
  const [enteredCountryId, setEnteredCountryId] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  
  useEffect(() => {
    axios.get(`http://localhost:8080/countries`).then((res) => {
      setMyCountries(res.data.countries);
    });
  }, []);

  const countryIdChangeHandler = (event) => {
    setEnteredCountryId(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const addData = {
      username: props.username,
      password: props.pwd,
      name: enteredName,
      countryId: enteredCountryId,
      airlineUsername: enteredUsername,
      airlinePassword: enteredPassword,
      email: enteredEmail,
    };
    props.onAddAirline(addData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-admin__controls">
        <div className="new-admin__control">
          <label className="control">Airline Name</label>
          <input className="control" type="text" onChange={nameChangeHandler} />
        </div>
        <div className="new-admin__control">
            <label className="control">Base Country</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={countryIdChangeHandler}
            >
              <option selected value={0}>
                Choose a Country
              </option>
              {myCountries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        <div className="new-admin__control">
          <label className="control">Username</label>
          <input
            className="control"
            type="text"
            onChange={usernameChangeHandler}
          />
        </div>
        <div className="new-admin__control">
          <label className="control">password</label>
          <input
            className="control"
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className="new-admin__control">
          <label className="control">E-mail</label>
          <input
            className="control"
            type="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
          />
        </div>
      </div>
      <div className="new-admin__actions">
        <Button type="submit">Add Airline</Button>
      </div>
    </form>
  );
};

export default AddAirlineForm;
