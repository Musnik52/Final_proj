const connectedKnex = require("../knex-connector");
const { logger } = require("../logger");
const { sendMsg } = require("../producer");
const { recieveMsg } = require("../consumer");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const config = require("config");
const sessionData = config.get("sessionData");

const getAllAdmins = async (req, res) => {
  const admins = await connectedKnex("administrators").select("*");
  res.status(200).json({ admins });
};

const getCustomerById = async (req, res) => {
  const id = req.params.id;
  const customer = await connectedKnex("customers")
    .select("*")
    .where("id", id)
    .first();
  res.status(200).json({ customer });
};

const getAllUsers = async (req, res) => {
  const users = await connectedKnex("users").select("*");
  res.status(200).json({ users });
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await connectedKnex("users").select("*").where("id", id).first();
  res.status(200).json({ user });
};

const getMyData = async (req, res) => {
  const myUser = await connectedKnex("users")
    .select("*")
    .where("username", req.params.user)
    .first();
  const admin = await connectedKnex("administrators")
    .select("*")
    .where("user_id", myUser.id)
    .first();
  res.status(200).json({ admin });
};

const getAllAirlines = async (req, res) => {
  const airlines = await connectedKnex("airline_companies")
    .select("airline_companies.id", "airline_companies.name", "users.username")
    .orderBy("airline_companies.id", "asc")
    .join("users", function () {
      this.on("airline_companies.user_id", "=", "users.id");
    });
  res.status(200).json({ airlines });
};

const getAirlineById = async (req, res) => {
  const id = req.params.id;
  const airline = await connectedKnex("airline_companies")
    .select("*")
    .where("id", id)
    .first();
  res.status(200).json({ airline });
};

const deleteCustomer = async (req, res) => {
  const qResName = `admin ${uuid.v4()}`;
  const customer = await connectedKnex("customers")
    .select("*")
    .where("id", req.body.delData.id)
    .first();
  const delUser = await connectedKnex("users")
    .select("*")
    .where("id", customer.user_id)
    .first();
  try {
    reqMsg = {
      action: "deleteCustomer",
      id: req.body.delData.id,
      username: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .username,
      password: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .password,
      customer_username: delUser.username,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("admin", reqMsg);
  } catch (e) {
    logger.error(`failed to delete customer. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  const qResName = `admin ${uuid.v4()}`;
  const myUser = await connectedKnex("users")
    .select("*")
    .where("username", req.params.user)
    .first();
  const admin = await connectedKnex("administrators")
    .select("*")
    .where("user_id", myUser.id)
    .first();
  try {
    reqMsg = {
      action: "deleteAdmin",
      id: admin.id,
      username: req.params.user,
      password: req.body.pwd,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("admin", reqMsg);
  } catch (e) {
    logger.error(`failed to delete admin. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const deleteAirline = async (req, res) => {
  const qResName = `admin ${uuid.v4()}`;
  const airline = await connectedKnex("airline_companies")
    .select("*")
    .where("id", req.body.delData.id)
    .first();
  const delUser = await connectedKnex("users")
    .select("*")
    .where("id", airline.user_id)
    .first();
  try {
    reqMsg = {
      action: "deleteAirline",
      id: req.body.delData.id,
      username: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .username,
      password: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .password,
      airline_username: delUser.username,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("admin", reqMsg);
  } catch (e) {
    logger.error(`failed to delete airline. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const removeFlight = async (req, res) => {
  const qResName = `admin ${uuid.v4()}`;
  try {
    reqMsg = {
      action: "removeFlight",
      id: req.body.delData.id,
      username: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .username,
      password: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .password,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("admin", reqMsg);
  } catch (e) {
    logger.error(`failed to delete airline. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const updateAdmin = async (req, res) => {
  const qResName = `admin ${uuid.v4()}`;
  try {
    reqMsg = {
      action: "updateAdmin",
      username: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .username,
      password: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .password,
      id: req.body.id,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("admin", reqMsg);
  } catch (e) {
    logger.error(`failed to update admin. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const updateAirline = async (req, res) => {
  const qResName = `admin ${uuid.v4()}`;
  try {
    reqMsg = {
      action: "updateAirline",
      username: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .username,
      password: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .password,
      id: req.body.id,
      name: req.body.name,
      country_id: req.body.countryId,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("admin", reqMsg);
  } catch (e) {
    logger.error(`failed to update airline. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const updateFlight = async (req, res) => {
  const qResName = `admin ${uuid.v4()}`;
  try {
    reqMsg = {
      action: "updateFlight",
      username: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .username,
      password: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .password,
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
    await sendMsg("admin", reqMsg);
  } catch (e) {
    logger.error(`failed to update flight. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const addAdmin = async (req, res) => {
  const qResName = `admin ${uuid.v4()}`;
  try {
    reqMsg = {
      action: "addAdmin",
      username: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .username,
      password: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .password,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      new_username: req.body.newUsername,
      new_password: req.body.newPassword,
      new_email: req.body.email,
      public_id: uuid.v4(),
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("admin", reqMsg);
  } catch (e) {
    logger.error(`failed to add admin. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const addAirline = async (req, res) => {
  const qResName = `admin ${uuid.v4()}`;
  try {
    reqMsg = {
      action: "addAirline",
      username: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .username,
      password: jwt.verify(await req.cookies.jwt_TOKEN, sessionData.secret)
        .password,
      name: req.body.name,
      country_id: req.body.countryId,
      new_username: req.body.airlineUsername,
      new_password: req.body.airlinePassword,
      new_email: req.body.email,
      public_id: uuid.v4(),
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("admin", reqMsg);
  } catch (e) {
    logger.error(`failed to add airline. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const getAllCustomers = async (req, res) => {
  const customers = await connectedKnex("customers")
    .select(
      "customers.id",
      "first_name",
      "last_name",
      "address",
      "phone_number",
      "users.email",
      "credit_card_number",
      "users.username"
    )
    .join("users", function () {
      this.on("customers.user_id", "=", "users.id");
    });
  res.status(200).json({ customers });
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  getAllAdmins,
  getMyData,
  deleteAdmin,
  updateAdmin,
  addAdmin,
  getAllAirlines,
  getAirlineById,
  deleteAirline,
  addAirline,
  getUserById,
  getAllUsers,
  deleteCustomer,
  removeFlight,
  updateFlight,
  updateAirline,
};
