const { Router } = require("express");
const router = Router();
const {
  addCustomer,
  getAllFlights,
  getFlightById,
} = require("../controllers/anonymusController");
const {
  updateCustomer,
} = require("../controllers/customerController");
const {
  updateFlight,
  updateAirline,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  getAllAdmins,
  getMyData,
  deleteAdmin,
  updateAdmin,
  addAdmin,
  getAllAirlines,
  getAirlineById,
  deleteAirline,
  addAirline,
  getUserById,
  getAllUsers,
  removeFlight,
} = require("../controllers/adminController");

router
  .route("/airlines/:id")
  .get(getAirlineById)
  .delete(deleteAirline)
  .put(updateAirline);
router
  .route("/customers/:id")
  .get(getCustomerById)
  .delete(deleteCustomer)
  .put(updateCustomer);
router
  .route("/flights/:id")
  .get(getFlightById)
  .delete(removeFlight)
  .put(updateFlight);
router.route("/users/:id").get(getUserById);
router.route("/airlines/").get(getAllAirlines).post(addAirline);
router.route("/customers/").get(getAllCustomers).post(addCustomer);
router.route("/flights/").get(getAllFlights);
router.route("/users/").get(getAllUsers);
router.route("/:user").get(getMyData).delete(deleteAdmin).put(updateAdmin);
router.route("/").get(getAllAdmins).post(addAdmin);

module.exports = router;
