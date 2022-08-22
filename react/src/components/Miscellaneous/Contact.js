import React from "react";

const Contact = (props) => {
  console.log(props);
  //setTimeout(() => {
  //props.history.push('/about')
  //}, 3000)
  return (
    <div>
      <div className="container">
        <h4 className="center">Contact</h4>
        <p>Make A Statement!</p>
        <p>We at Airlock are always looking to impvove. </p>
        <p>Got any suggestion?</p>
        <p>Have a business proposition?</p>
        <p>Want to make your voice heard?</p>
        <p>
          If so, please contact us at: <br />
          <address>
            <a href="mailto:Airlock@BGLTD.com">Airlock@BGLTD.com</a>
            <br />
            Maze, pinat Mapo st, Tel-Aviv, Israel
          </address>
        </p>
      </div>
    </div>
  );
};

export default Contact;
