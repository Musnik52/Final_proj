import React, { useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import "./Login.css";
import axios from "axios";

const Login = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
    setFormIsValid(enteredPassword.trim().length > 6);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(event.target.value.trim().length > 6);
  };

  const validateUsernameHandler = () => {
    setUsernameIsValid(enteredUsername.length > 3);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/login", {
        username: enteredUsername,
        password: enteredPassword,
      })
      .then((res) => {
        props.onLogin(res.data.user, res.data.role);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="container">
        <br />
        <h3 className="center">Login</h3>
        <Card className="login">
          <form onSubmit={submitHandler}>
            <div
              className={`control ${
                usernameIsValid === false ? "invalid" : ""
              }`}
            >
              <label className="control" htmlFor="text">
                Username{" "}
              </label>
              <input
                className="control"
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
              <br />
              <label className="control" htmlFor="password">
                Password{" "}
              </label>
              <input
                className="control"
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
