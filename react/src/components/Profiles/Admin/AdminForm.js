import React, { useEffect, useState } from "react";
import Button from "../../UI/Button/Button";
import axios from "axios";
import "./UserUpdate.css";

const UserSettings = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredUserId, setUserId] = useState("");
  const [enteredAdminId, setAdminId] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admins/${props.username}`)
      .then((res) => {
        console.log(res.data.admin);
        setEnteredFirstName(res.data.admin.first_name);
        setEnteredLastName(res.data.admin.last_name);
        setUserId(res.data.admin.user_id);
        setAdminId(res.data.admin.id);
      })
      .catch((err) => console.log(err));
  }, []);

  const firstNameChangeHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const isAddChangeHandler = (event) => {
    setIsAdd(true);
    setEnteredFirstName("");
    setEnteredLastName("");
  };

  const isDeleteChangeHandler = (event) => {
    setIsDelete(true);
  };

  const newUsernameChangeHandler = (event) => {
    setNewUsername(event.target.value);
  };

  const newPasswordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (isAdd) {
      const addData = {
        username: props.username,
        password: props.pwd,
        firstName: enteredFirstName,
        email: enteredEmail,
        lastName: enteredLastName,
        newUsername: newUsername,
        newPassword: newPassword,
      };
      props.onAdd(addData);
    } else if (isDelete) {
      props.onDelete();
    } else {
      const updateData = {
        username: props.username,
        password: props.pwd,
        id: enteredAdminId,
        firstName: enteredFirstName,
        lastName: enteredLastName,
        UserId: enteredUserId,
      };
      props.onUpdate(updateData);
    }
  };

  return (
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
        {!isAdd && (
          <div className="new-customer__control">
            <label className="control">Delete Profile</label>
            <button
              className="btn btn-danger delete_customer"
              type="button"
              onClick={isDeleteChangeHandler}
            >
              Press Here To Delete
            </button>
          </div>
        )}
        {!isAdd && (
          <div className="new-customer__control">
            <label className="control">Add an Admin</label>
            <button
              className="btn btn-success delete_customer"
              type="button"
              onClick={isAddChangeHandler}
            >
              Press Here To Add
            </button>
          </div>
        )}
        {isAdd && (
          <div className="new-admin__control">
            <label className="control">Username</label>
            <input
              className="control"
              type="text"
              onChange={newUsernameChangeHandler}
            />
          </div>
        )}
        {isAdd && (
          <div className="new-admin__control">
            <label className="control">Password</label>
            <input
              className="control"
              type="text"
              onChange={newPasswordChangeHandler}
            />
          </div>
        )}
        {isAdd && (
          <div className="new-admin__control">
            <label className="control">Email</label>
            <input
              className="control"
              type="text"
              onChange={emailChangeHandler}
            />
          </div>
        )}
      </div>
      <div className="new-admin__actions">
        <Button type="submit">
          {isAdd ? "Add Admin" : isDelete ? "Delete" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default UserSettings;
