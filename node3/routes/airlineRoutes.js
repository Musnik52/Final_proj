const { Router } = require("express");
const router = Router();
const {
  getAllFlights,
  getFlightById,
  deleteFlight,
  updateFlight,
  addFlight,
} = require("../controllers/airlineController");

router.route("/").get(getAllFlights).post(addFlight);
router.route("/:id").get(getFlightById).delete(deleteFlight).put(updateFlight);

module.exports = router;
