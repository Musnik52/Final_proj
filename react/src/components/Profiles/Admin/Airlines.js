import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBoard from "../../UI/Table/TableBoard";

const Airlines = (props) => {
  const colNames = ["id", "airline name", "system username"];
  const [airlineCompanies, setAirlineCompanies] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/admins/airlines/`).then((res) => {
      setAirlineCompanies(res.data.airlines);
    });
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <h4 className="">Airlines</h4>
        <TableBoard list={airlineCompanies} tableCol={colNames} />
      </div>
    </React.Fragment>
  );
};

export default Airlines;
