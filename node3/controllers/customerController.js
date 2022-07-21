const connectedKnex = require("../knex-connector");
const { logger } = require("../logger");

const getAllCustomers = async (req, res) => {
  const customers = await connectedKnex("customers").select("*");
  res.status(200).json({ customers });
};

const getCustomerById = async (req, res) => {
  const id = req.params.id;
  const customers = await connectedKnex("customers")
    .select("*")
    .where("id", id)
    .first();
  res.status(200).json({ customers });
};

const deleteCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const customers = connectedKnex("customers").where("id", id).del();
    res.status(200).json({ num_records_deleted: customers });
  } catch (e) {
    logger.error(`failed to delete a customer. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    customer = req.body;

    const result = await connectedKnex("customers")
      .where("id", id)
      .update(customer);
    res.status(200).json({
      res: "success",
      url: `/customers/${id}`,
      result,
    });
  } catch (e) {
    logger.error(`failed to update customer. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const addCustomer = async (req, res) => {
  try {
    customer = req.body;
    const result = await connectedKnex("customers").insert(customer);
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
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
  addCustomer,
};
