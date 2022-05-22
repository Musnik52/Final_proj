const express = require("express");
const router = express.Router();
const { logger } = require("./logger");
const airlock_repo = require("./airlock-repo");
const path = require("path");
const url = require("url");
const cors = require("cors");

logger.debug("====== System startup ========");

const port = 8080;

const app = express();

app.use(express.static(path.join(".", " /static")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, resp) => {
  resp.writeHead(200);
  resp.end("This will be THE HOME PAGE");
});

// app.get("/login", (req, resp) => {
//   resp.sendFile(path.join(__dirname, "static/login.html"), {
//     try_again: false,
//     registered_success: false,
//   });
// });

app.get("/customers", async (req, res) => {
  const customers = await airlock_repo.getAll("customers");
  res.status(200).json({ customers });
});

app.post("/customers/raw", async (req, res) => {
  try {
    input = req.body;
    const result = await airlock_repo.getRaw(input.query);
    res.status(201).json({
      res: "success",
      raws: result.rows,
    });
  } catch (e) {
    logger.error(`failed to run raw. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
});

app.get("/customers/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  const customers = await airlock_repo.getByid("customers", customer_id);
  res.status(200).json({ customers });
});

app.delete("/customers/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  try {
    const customers = await airlock_repo.deleteData("customers", customer_id);
    res.status(200).json({ num_records_deleted: customers });
  } catch (e) {
    logger.error(`failed to delete a customer. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
});

app.put("/customers/:customer_id", async (req, res) => {
  const customer_id = req.params.customer_id;
  try {
    customer = req.body;
    const result = await airlock_repo.updateData(
      "customers",
      customer,
      customer_id
    );
    res.status(200).json({
      res: "success",
      url: `/customers/${customer_id}`,
      result,
    });
  } catch (e) {
    logger.error(`failed to update customer. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
});

app.post("/customers", async (req, res) => {
  try {
    customer = req.body;
    const result = await airlock_repo.addData("customers", customer);
    res.status(201).json({
      res: "success",
      url: `/customers/${result[0]}`,
      result,
    });
  } catch (e) {
    logger.error(`failed to add a customer. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
});

app.listen(port, () => {
  logger.info(`Listening to https://localhost:${port}`);
});
