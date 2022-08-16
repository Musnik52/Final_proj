import { useState } from "react";
import Button from "../UI/Button/Button";
import "./SignupForm.css";

const SignupForm = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredCCN, setEnteredCCN] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  const firstNameChangeHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const addressChangeHandler = (event) => {
    setEnteredAddress(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };

  const ccnChangeHandler = (event) => {
    setEnteredCCN(event.target.value);
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

    const customerData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      address: enteredAddress,
      phone: enteredPhone,
      ccn: enteredCCN,
      username: enteredUsername,
      password: enteredPassword,
      email: enteredEmail,
    };
    props.onSaveCustomerData(customerData);
    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredAddress("");
    setEnteredPhone("");
    setEnteredCCN("");
    setEnteredUsername("");
    setEnteredPassword("");
    setEnteredEmail("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-customer__controls">
        <div className="new-customer__control">
          <label className="control">First Name</label>
          <input
            className="control"
            type="text"
            value={enteredFirstName}
            onChange={firstNameChangeHandler}
          />
        </div>
        <div className="new-customer__control">
          <label className="control">Last Name</label>
          <input
            className="control"
            type="text"
            value={enteredLastName}
            onChange={lastNameChangeHandler}
          />
        </div>
        <div className="new-customer__control">
          <label className="control">Address</label>
          <input
            className="control"
            type="text"
            value={enteredAddress}
            onChange={addressChangeHandler}
          />
        </div>
        <div className="new-customer__control">
          <label className="control">Phone Number</label>
          <input
            className="control"
            type="text"
            value={enteredPhone}
            onChange={phoneChangeHandler}
          />
        </div>
        <div className="new-customer__control">
          <label className="control">Credit Card Number</label>
          <input
            className="control"
            type="number"
            value={enteredCCN}
            onChange={ccnChangeHandler}
          />
        </div>
        <div className="new-customer__control">
          <label className="control">Username</label>
          <input
            className="control"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
        </div>
        <div className="new-customer__control">
          <label className="control">password</label>
          <input
            className="control"
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className="new-customer__control">
          <label className="control">E-mail</label>
          <input
            className="control"
            type="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
          />
        </div>
      </div>
      <div className="new-customer__actions">
        <Button type="submit">Sign Me Up</Button>
      </div>
    </form>
  );
};

export default SignupForm;
