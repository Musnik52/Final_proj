import React from "react";
// import TimeFilter from "./TimeFilter";
const TableBoard = (props) => {
  return (
    <div style={{ width: "100%", boxShadow: "3px 6px 3px #cccd" }}>
      {props.list.length > 0 && (
        <table
          className="table table-striped"
          cellSpacing="0"
          style={{ width: "100%", heigth: "auto", padding: "5px 10px" }}
        >
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              {props.tableCol.map((headerItem, index) => (
                <th key={index}>{headerItem.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(props.list).map((obj, index) => (
              <tr key={index}>
                {Object.values(obj).map((value, index2) => (
                  <td key={index2}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableBoard;
