import React, { useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import "./Login.css";

const Login = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const usernameChangeHandler = (event) => {
    // live update of input
    setEnteredUsername(event.target.value);

    setFormIsValid(
      // valodate email includes @ and password length is more than 6
      enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    // live update of input
    setEnteredPassword(event.target.value);

    setFormIsValid(
      // valodate email includes @ and password length is more than 6
      event.target.value.trim().length > 6
    );
  };

  const validateUsernameHandler = () => {
    setUsernameIsValid(enteredUsername.length > 0);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    // page doesn't refresh on submit
    event.preventDefault();
    const loginData = {
      username: enteredUsername,
      password: enteredPassword,
    };
    console.log(loginData);
    // RABBITMQ HERE TO LOGIN
    props.onLogin(enteredUsername, enteredPassword);
  };

  return (
    <React.Fragment>
      <div className="container">
        <h4 className="center">Login</h4>
        <Card className="login">
          <form onSubmit={submitHandler}>
            <div
              className={`control ${
                usernameIsValid === false ? "invalid" : ""
              }`}
            >
              <label htmlFor="text">Username</label>
              <input
                type="text"
                id="text"
                value={enteredUsername}
                onChange={usernameChangeHandler}
                onBlur={validateUsernameHandler}
              />
            </div>
            <div
              className={`control ${
                passwordIsValid === false ? "invalid" : ""
              }`}
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
              />
            </div>
            <div className="actions">
              <Button type="submit" disabled={!formIsValid}>
                Login
              </Button>
            </div>
            <p>
              {" "}
              Don't have an account? <br />
              <span className="line">
                <a href="/signup">Sign up</a>
              </span>
            </p>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Login;
