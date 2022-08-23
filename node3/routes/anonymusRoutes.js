const { Router } = require("express");
const router = Router();
const {
  Login,
  addCustomer,
  getAllFlights,
  getFlightById,
  getAllCountries,
} = require("../controllers/anonymusController");

router.route("/flights/:id").get(getFlightById);
router.route("/countries").get(getAllCountries);
router.route("/flights").get(getAllFlights);
router.route("/login").post(Login);
router.route("/").post(addCustomer);

module.exports = router;
