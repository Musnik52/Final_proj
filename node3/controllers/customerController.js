const connectedKnex = require("../knex-connector");
const { logger } = require("../logger");
const { sendMsg } = require("../producer");
const { recieveMsg } = require("../consumer");
const uuid = require("uuid");

const deleteCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const customer = await connectedKnex("customers")
      .select("*")
      .where("id", id)
      .first();
    const userDel = await connectedKnex("users")
      .where("id", customer.user_id)
      .del();
    const customerDel = await connectedKnex("customers").where("id", id).del();
    res.status(200).json({ customer_deleted: customer });
  } catch (e) {
    logger.error(`failed to delete a customer. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  const qResName = `customer ${uuid.v4()}`;
  try {
    reqMsg = {
      action: "update",
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      phone_number: req.body.phone_number,
      credit_card_number: req.body.credit_card_number,
      queue_name: `response ${qResName}`,
    };
    recieveMsg(reqMsg.queue_name, res);
    await sendMsg("customer", reqMsg);
  } catch (e) {
    logger.error(`failed to update customer. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
};

// const getMyTickets = async (req, res) => {
//   const id = req.params.id;
//   const customer = await connectedKnex("customers")
//       .select("*")
//       .where("id", id)
//       .first();
//   const tickets = await connectedKnex("tickets").select("*").where("customer_id", customer.id);
// };

module.exports = {
  deleteCustomer,
  updateCustomer,
  // getMyTickets,
};
