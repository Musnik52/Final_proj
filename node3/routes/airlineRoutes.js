const { Router } = require("express");
const router = Router();
const {
  updateAirline,
  getMyFlights,
  getMyData,
  removeFlight,
  addFlight,
  deleteAirline,
  updateFlight,
} = require("../controllers/airlineController");

router
  .route("/flights/:user")
  .get(getMyFlights)
  .post(addFlight)
  .delete(removeFlight)
  .put(updateFlight);
router.route("/:user").get(getMyData).put(updateAirline).delete(deleteAirline);

module.exports = router;
