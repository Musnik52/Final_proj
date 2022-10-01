import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBoard from "../../UI/Table/TableBoard";
import Card from "../../UI/Card/Card";
import RemoveForm from "./RemoveForm";

const Customers = (props) => {
  const colNames = [
    "id",
    "first name",
    "last name",
    "address",
    "phone",
    "email",
    "credit card",
    "system user",
  ];

  const [isRemoveAction, setIsRemoveAction] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/admins/customers/`).then((res) => {
      setCustomers(res.data.customers);
    });
  }, []);

  const removeActionHandler = () => {
    setIsRemoveAction(true);
  };

  const submitRemoveHandler = (delData) => {
    axios
      .delete(`http://localhost:8080/admins/customers/${delData.id}`, {
        data: { delData },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="container">
        <Card className="">
          {!isRemoveAction && (
            <button className="btn btn-danger" onClick={removeActionHandler}>
              Remove a Customer
            </button>
          )}
          {isRemoveAction && (
            <RemoveForm
              myInput={customers}
              username={props.username}
              pwd={props.pwd}
              onSubmit={submitRemoveHandler}
            />
          )}
        </Card>
        <TableBoard list={customers} tableCol={colNames} />
      </div>
    </React.Fragment>
  );
};

export default Customers;
