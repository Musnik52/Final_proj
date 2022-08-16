const { Router } = require("express");
const router = Router();
const {
  Sync,
  Login,
  addCustomer,
  getAllFlights,
  getFlightById,
} = require("../controllers/anonymusController");

router.route("/flights/:id").get(getFlightById);
router.route("/flights").get(getAllFlights);
router.route("/login").post(Login);
router.route("/sync").post(Sync);
router.route("/").post(addCustomer);

module.exports = router;
