import React from "react";
import "./TimeFilter.css";

const TimeFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <React.Fragment>
    <div className="time-filter">
      <div className="time-filter__control">
          <p>Filter by </p>
          <select value={props.selected} onChange={dropdownChangeHandler}>
            <option value="1">1 Hour</option>
            <option value="3">3 Hours</option>
            <option value="12">12 Hours</option>
            <option value="24">24 Hours</option>
          </select>
      </div>
    </div>
    </React.Fragment>
  );
};

export default TimeFilter;
