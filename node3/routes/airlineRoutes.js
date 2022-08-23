const { Router } = require("express");
const router = Router();
const {
  updateAirline,
  getMyFlights,
  getMyData,
} = require("../controllers/airlineController");

router.route("/flights/:user").get(getMyFlights);
router.route("/:user").get(getMyData).put(updateAirline);

module.exports = router;
