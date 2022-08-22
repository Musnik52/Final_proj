const { Router } = require("express");
const router = Router();
const {
  updateAirline,
  getMyFlights,
} = require("../controllers/airlineController");

router.route("/flights/:user").get(getMyFlights);
router.route("/:id").put(updateAirline);

module.exports = router;
