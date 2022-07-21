const connectedKnex = require("../knex-connector");
const { logger } = require("../logger");

const getAllFlights = async (req, res) => {
    const flights = await connectedKnex("flights").select("*");
    res.status(200).json({ flights });
  };
  
  const getFlightById = async (req, res) => {
    const id = req.params.id;
    const flights = await connectedKnex("flights")
      .select("*")
      .where("id", id)
      .first();
    res.status(200).json({ flights });
  };
  
  const deleteFlight = async (req, res) => {
    const id = req.params.id;
    try {
      const flights = connectedKnex("flights").where("id", id).del();
      res.status(200).json({ num_records_deleted: flights });
    } catch (e) {
      logger.error(`failed to delete a flight. Error: ${e}`);
      res.status(400).send({
        status: "error",
        message: e.message,
      });
    }
  };
  
  const updateFlight = async (req, res) => {
    const id = req.params.id;
    try {
      flight = req.body;
  
      const result = await connectedKnex("flights")
        .where("id", id)
        .update(flight);
      res.status(200).json({
        res: "success",
        url: `/flights/${id}`,
        result,
      });
    } catch (e) {
      logger.error(`failed to update flight. Error: ${e}`);
      res.status(400).send({
        status: "error",
        message: e.message,
      });
    }
  };
  
  const addFlight = async (req, res) => {
    try {
      flight = req.body;
      const result = await connectedKnex("flights").insert(flight);
      res.status(201).json({
        res: "success",
        url: `/flights/${result[0]}`,
        result,
      });
    } catch (e) {
      logger.error(`failed to add a flight. Error: ${e}`);
      res.status(400).send({
        status: "error",
        message: e.message,
      });
    }
  };
  
  module.exports = {
    getAllFlights,
    getFlightById,
    deleteFlight,
    updateFlight,
    addFlight,
  };
  