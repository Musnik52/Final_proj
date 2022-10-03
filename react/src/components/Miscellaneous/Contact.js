import React from "react";
import Card from "../UI/Card/Card";
import './Contact.css'

const Contact = () => {
  return (
    <div className='container__img2'>
      <Card className="card2">
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
      </Card>
    </div>
  );
};

export default Contact;
