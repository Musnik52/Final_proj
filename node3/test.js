const connectedKnex = require("./knex-connector");
const uuid = require("uuid");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

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

const Sync = async () => {
  const { username, password, email, public_id, user_role } = await connectedKnex("users").select("*");
  console.log(user_role);
  try {
    const user = await User.create({
        username,
        password,
        email,
        public_id,
        user_role,
    });
    const token = createToken(user._id);
    // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res
    //   .status(201)
    //   .json({ id: user._id, user: user.username, role: user.user_role });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors)
  }
};

Sync()
