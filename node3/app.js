const cors = require("cors");
const config = require("config");
const port = config.get("ports");
const express = require("express");
const mongoose = require("mongoose");
const { logger } = require("./logger");
const adminRoutes = require("./routes/adminRoutes");
const airlineRoutes = require("./routes/airlineRoutes");
const customerRoutes = require("./routes/customerRoutes");
const anonymusRoutes = require("./routes/anonymusRoutes");

logger.debug("====== System startup ======");
const app = express();

// middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/customers", customerRoutes);
app.use("/admins", adminRoutes);
app.use("/flights", airlineRoutes);

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
app.get("/", (req, res) => res.status(200).render("index"));
