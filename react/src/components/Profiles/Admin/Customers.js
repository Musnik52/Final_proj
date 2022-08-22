import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBoard from "../../UI/Table/TableBoard";

const Airlines = (props) => {
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
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/admins/customers/`).then((res) => {
      setCustomers(res.data.customers);
    });
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <h4 className="">Customers</h4>
        <TableBoard list={customers} tableCol={colNames} />
      </div>
    </React.Fragment>
  );
};

export default Airlines;
