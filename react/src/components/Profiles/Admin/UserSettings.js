import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import axios from "axios";
import "./UserUpdate.css";

const UserSettings = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredUserId, setUserId] = useState("");
  const [enteredAdminId, setAdminId] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/admins/${props.username}`).then((res) => {
      console.log(res.data.admin);
      setEnteredFirstName(res.data.admin.first_name);
      setEnteredLastName(res.data.admin.last_name);
      setUserId(res.data.admin.user_id);
      setAdminId(res.data.admin.id);
    });
  }, []);

  const firstNameChangeHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const updateData = {
      username: props.username,
      password: props.pwd,
      id: enteredAdminId,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      UserId: enteredUserId,
    };

    axios
      .put(`http://localhost:8080/admins/${props.username}`, updateData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = (event) => {
    axios
      .delete(`http://localhost:8080/admins/${props.username}`, {
        data: { pwd: props.pwd },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    return props.onLogout();
  };
  return (
    <Card className="update">
      <h4 className="">User Settings</h4>
      <form onSubmit={submitHandler}>
        <div className="new-admin__controls">
          <div className="new-admin__control">
            <label className="control">First Name</label>
            <input
              className="control"
              type="text"
              value={enteredFirstName}
              onChange={firstNameChangeHandler}
            />
          </div>
          <div className="new-admin__control">
            <label className="control">Last Name</label>
            <input
              className="control"
              type="text"
              value={enteredLastName}
              onChange={lastNameChangeHandler}
            />
          </div>

          <div className="new-customer__control">
            <label className="control">Delete Profile</label>
            <button
              className="btn btn-danger delete_customer"
              type="button"
              onClick={deleteHandler}
            >
              Press Here To Delete
            </button>
          </div>
        </div>
        <div className="new-admin__actions">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </Card>
  );
};

export default UserSettings;
