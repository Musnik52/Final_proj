import React from "react";

const About = (props) => {
  console.log(props);
  return (
    <div>
      <div className="container">
        <h4 className="center">About</h4>
        <span>
          Our Company, Airlock, was founded by Boris Group LTD in 2022. <br />
          Ever since its inception, Airlock managged to book a flight for every
          single customer. <br />
          <ul>
          Among our numerous achievements are:
            <li>Solving world hunger.</li>
            <li>Bringing equal rights to 9.9 billion people.</li>
            <li>Finding Waldo.</li>
            <li>Counting to infinity. Twice.</li>
          </ul>
        </span>
      </div>
    </div>
  );
};

export default About;
