const connectedKnex = require("../knex-connector");
const { logger } = require("../logger");
const { sendMsg } = require("../producer");
const { recieveMsg } = require("../consumer");
const uuid = require("uuid");

const deleteAirline = async (req, res) => {
  const qResName = `airline ${uuid.v4()}`;
  const myUser = await connectedKnex("users")
    .select("*")
    .where("username", req.params.user)
    .first();
  const airline = await connectedKnex("airline_companies")
    .select("*")
    .where("user_id", myUser.id)
    .first();
  try {
    reqMsg = {
      action: "deleteAirline",
      id: airline.id,
      username: req.params.user,
      password: req.body.pwd,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("airline", reqMsg);
  } catch (e) {
    logger.error(`failed to delete airline. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const updateAirline = async (req, res) => {
  const qResName = `airline ${uuid.v4()}`;
  try {
    reqMsg = {
      action: "updateAirline",
      username: req.body.username,
      password: req.body.password,
      id: req.body.id,
      name: req.body.name,
      country_id: req.body.countryId,
      user_id: req.body.UserId,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("airline", reqMsg);
  } catch (e) {
    logger.error(`failed to update airline. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const getMyFlights = async (req, res) => {
  const myUser = await connectedKnex("users")
    .select("*")
    .where("username", req.params.user)
    .first();
  const airline = await connectedKnex("airline_companies")
    .select("*")
    .where("user_id", myUser.id)
    .first();
  const flights = await connectedKnex("flights")
    .select(
      "flights.id",
      "c1.name as origin_country",
      "c2.name as destination_country",
      "flights.departure_time",
      "flights.landing_time",
      "flights.remaining_tickets"
    )
    .orderBy("flights.id", "asc")
    .where("flights.airline_company_id", airline.id)
    .join("countries as c1", function () {
      this.on("flights.origin_country_id", "=", "c1.id");
    })
    .join("countries as c2", function () {
      this.on("flights.destination_country_id", "=", "c2.id");
    });
  res.status(200).json({ flights });
};

const removeFlight = async (req, res) => {
  const myFlight = await connectedKnex("flights")
    .select("*")
    .where("id", req.body.flightData.id)
    .first();
  const qResName = `airline ${uuid.v4()}`;
  try {
    reqMsg = {
      action: "removeFlight",
      username: req.body.flightData.username,
      password: req.body.flightData.password,
      id: myFlight.id,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("airline", reqMsg);
  } catch (e) {
    logger.error(`failed to remove ticket. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const updateFlight = async (req, res) => {
  const qResName = `airline ${uuid.v4()}`;
  try {
    reqMsg = {
      action: "updateFlight",
      username: req.body.username,
      password: req.body.password,
      airlineId: req.body.airlineId,
      flightId: req.body.flightId,
      originId: req.body.originId,
      destinationId: req.body.destinationId,
      departurTime: req.body.departurTime,
      landingTime: req.body.landingTime,
      remainingTickets: req.body.remainingTickets,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("airline", reqMsg);
  } catch (e) {
    logger.error(`failed to update flight. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const addFlight = async (req, res) => {
  const qResName = `airline ${uuid.v4()}`;
  try {
    reqMsg = {
      action: "addFlight",
      username: req.body.username,
      password: req.body.password,
      airlineId: req.body.airlineId,
      originId: req.body.originId,
      destinationId: req.body.destinationId,
      departurTime: req.body.departurTime,
      landingTime: req.body.landingTime,
      remainingTickets: req.body.remainingTickets,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("airline", reqMsg);
  } catch (e) {
    logger.error(`failed to add flight. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const getMyData = async (req, res) => {
  const myUser = await connectedKnex("users")
    .select("*")
    .where("username", req.params.user)
    .first();
  const airline = await connectedKnex("airline_companies")
    .select("*")
    .where("user_id", myUser.id)
    .first();
  res.status(200).json({ airline });
};

module.exports = {
  getMyFlights,
  updateAirline,
  removeFlight,
  updateFlight,
  addFlight,
  getMyData,
  deleteAirline,
  updateFlight,
};
