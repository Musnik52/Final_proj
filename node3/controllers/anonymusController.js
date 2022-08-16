const connectedKnex = require("../knex-connector");
const { logger } = require("../logger");
const { sendMsg } = require("../producer");
const { recieveMsg } = require("../consumer");
const uuid = require("uuid");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  // incorrect username
  if (err.message === "incorrect username") {
    errors.username = "That username is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate username error
  if (err.code === 11000) {
    errors.username = "that username is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret key", {
    expiresIn: maxAge,
  });
};

const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user.username, role: user.user_role });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

//   const logout = (req, res) => {
//     res.cookie("jwt", "", { maxAge: 1 });
//     res.redirect("/");
//   };

// const Signup = async (req, res) => {
//   const { username, password, email, public_id, user_role } = req.body;
//   try {
//     const user = await User.create({
//       username,
//       password,
//       email,
//       public_id,
//       user_role,
//     });
//     const token = createToken(user._id);
//     res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
//     res
//       .status(201)
//       .json({ id: user._id, user: user.username, role: user.role });
//   } catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }
// };

const addCustomer = async (req, res) => {
  const qResName = `customer ${uuid.v4()}`;
  const salt = await bcrypt.genSalt();
  const { username, email, firstName, lastName, address, phone, ccn } =
    req.body;
  try {
    reqMsg = {
      action: "add",
      username: username,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone_number: phone,
      credit_card_number: ccn,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("customer", reqMsg);
  } catch (e) {
    logger.error(`failed to add a customer. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const getAllFlights = async (req, res) => {
  const flights = await connectedKnex("flights")
    .select(
      "flights.id",
      "airline_companies.name as airline",
      "c1.name as origin_country",
      "c2.name as destination_country",
      "flights.departure_time",
      "flights.landing_time",
      "flights.remaining_tickets"
    )
    .orderBy("flights.id", "asc")
    .join("countries as c1", function () {
      this.on("flights.origin_country_id", "=", "c1.id");
    })
    .join("countries as c2", function () {
      this.on("flights.destination_country_id", "=", "c2.id");
    })
    .join("airline_companies", function () {
      this.on("flights.airline_company_id", "=", "airline_companies.id");
    });
  res.status(200).json({ flights });
};

const getFlightById = async (req, res) => {
  const id = req.params.id;
  const flight = await connectedKnex("flights")
    .select(
      "flights.id",
      "airline_companies.name as airline",
      "c1.name as origin_country",
      "c2.name as destination_country",
      "flights.departure_time",
      "flights.landing_time",
      "flights.remaining_tickets"
    )
    .where("flights.id", id)
    .join("countries as c1", function () {
      this.on("flights.origin_country_id", "=", "c1.id");
    })
    .join("countries as c2", function () {
      this.on("flights.destination_country_id", "=", "c2.id");
    })
    .join("airline_companies", function () {
      this.on("flights.airline_company_id", "=", "airline_companies.id");
    })
    .first();
  res.status(200).json({ flight });
};

const Sync = async (req, res) => {
  const { username, password, email, public_id, user_role } =
    await connectedKnex("users")
      .select(
        "username",
        "password",
        "email",
        "public_id",
        "role.role_name as user_role"
      )
      .join("user_roles as role", function () {
        this.on("users.user_role", "=", "role.id");
      })
      .first(); // NEEDS TO CHANGE TO ALL
  try {
    const user = await User.create({
      username,
      password,
      email,
      public_id,
      user_role,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res
      .status(201)
      .json({ id: user._id, user: user.username, role: user.user_role });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = {
  Sync,
  Login,
  addCustomer,
  getAllFlights,
  getFlightById,
};
