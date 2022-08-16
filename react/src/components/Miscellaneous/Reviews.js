import React from "react";
import Card from "../UI/Card/Card";
import "./Reviews.css";
import pika_pic from "../../Assets/pika_pic.jpg";
import slj_pic from "../../Assets/slj_pic.webp";
import catchme_pic from "../../Assets/catchme_pic.jpg";
import fbi_pic from "../../Assets/fbi_pic.png";
import bp_pic from "../../Assets/bp_pic.jpg";

const Reviews = (props) => {
  return (
    <React.Fragment>
      <br />
      <h1>Reviews</h1>
      <h3 className="text-decoration-underline">
        Take a look at what some of our <br />
        satisfied customers had to say:
      </h3>
      <div class="container text-center">
        <div class="row">
          <Card className="card">
            <br />
            <img src={pika_pic} className="card-img-top" alt="pikachu" />
            <div className="card-body">
              <h5 className="card-title">
                Pikachu Levi, <br />
                Level 14
              </h5>
              <br />
              <p className="card-text">
                "Pika pika, pikaaaaa! Pikachu-pika, piiiikaaaaaaCHUUUU!!!!
                <br /> pika Airlock pika! <br />
                PI-KA-CHU!"
              </p>
              <br />
              <br />
              <h4>⚡⚡⚡⚡/5</h4>
            </div>
          </Card>
          <Card className="card">
            <img
              src={slj_pic}
              className="card-img-top"
              alt="Samuel l Jackson"
            />
            <div className="card-body">
              <h5 className="card-title">
                Samuel L. Jackson, <br />
                Age: 57
              </h5>
              <br />
              <p className="card-text">
                "I personally enjoyed
                <br /> the fact there were no mother$*#@ing snakes on the
                mother$*#@ing plane."
              </p>
              <br />
              <h4>✈️✈️✈️/5</h4>
            </div>
          </Card>
          <Card className="card">
            <br />
            <img src={catchme_pic} className="card-img-top" alt="Leo" />
            <div className="card-body">
              <h4 className="card-title">
                {" "}
                Frank William Abagnale Jr.,
                <br />
                Age: 16 or 27
              </h4>
              <br />
              <p className="card-text">
                "As a pilot, doctor and banker, I feel like I need to escape to
                a remote vacation sometimes. Thank god For Airlock!"
              </p>
              <br />
              <br />
              <h4>💸💸💸💸💸/5</h4>
            </div>
          </Card>
          <div class="row">
            <Card className="card">
              <br />
              <img src={fbi_pic} className="card-img-top" alt="fbi_agent" />
              <div className="card-body">
                <h4 className="card-title">
                  Carl Hanratty, FBI,
                  <br />
                  Age: CLASSIFIED
                </h4>
                <p className="card-text">
                  "I'm looking for Leonardo DiCaprio-...yes, it's nice, but
                  have you seen him??"
                </p>
                <h4>🏃‍♂️⬅️⬅️🏃‍♂️/5</h4>
              </div>
            </Card>
            <Card className="card">
              <br />
              <img src={bp_pic} className="card-img-top" alt="birdperson" />
              <div className="card-body">
                <h4 className="card-title">
                  {" "}
                  Bird-Person,
                  <br />
                  Age: ?
                </h4>
                <br />
                <br />
                <p className="card-text">
                  "I am half Bird. <br /> I have wings, so I can fly.
                  <br /> What is this Airlock?"
                </p>
                <br />
                <br />
                <br />
                <h4>👨❓🐦/5</h4>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Reviews;
