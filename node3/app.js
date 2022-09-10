const cors = require("cors");
const config = require("config");
const port = config.get("ports");
const express = require("express");
const mongoose = require("mongoose");
const { logger } = require("./logger");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");
const airlineRoutes = require("./routes/airlineRoutes");
const anonymusRoutes = require("./routes/anonymusRoutes");
const customerRoutes = require("./routes/customerRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

logger.debug("====== System startup ======");
const app = express();

// middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/admins", adminRoutes, requireAuth);
app.use("/airlines", airlineRoutes, requireAuth);
app.use("/customers", customerRoutes, requireAuth);
app.use(anonymusRoutes);
app.use(
  session({
    key: "airlockSession",
    secret: "borisKing",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// Mongodb connection
const dbURI = config.get("mongo");
mongoose
  .connect(dbURI.conn_str, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log(result.connection);
    app.listen(port.listening, () =>
      logger.info(`Listening to http://localhost:${port.listening}`)
    );
  })
  .catch((err) => logger.info(err));

// routes
app.get("*", checkUser, requireAuth);
app.get("/", requireAuth, (req, res) => res.status(200).render("index"));

// cookies
app.get('/set-cookies', (req, res) => {
  res.setHeader('Set-Cookie', 'newUser=true');
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
  console.log(res.cookie)
  res.send('you got the cookies!');
});

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});
