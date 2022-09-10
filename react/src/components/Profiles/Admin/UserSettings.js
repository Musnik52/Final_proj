import React from "react";
import Card from "../../UI/Card/Card";
import AdminForm from "./AdminForm";
import axios from "axios";
import "./UserUpdate.css";

const UserSettings = (props) => {
  const updateHandler = (updateData) => {
    axios
      .put(`http://localhost:8080/admins/${props.username}`, updateData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = () => {
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

  const addHandler = (addData) => {
    axios
      .post(`http://localhost:8080/admins/`, addData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className="update">
      <h4 className="">User Settings</h4>
      <AdminForm
        username={props.username}
        pwd={props.pwd}
        onLogout={props.onLogout}
        onDelete={deleteHandler}
        onUpdate={updateHandler}
        onAdd={addHandler}
      />
    </Card>
  );
};

export default UserSettings;
