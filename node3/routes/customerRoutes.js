const { Router } = require("express");
const router = Router();
const {
  deleteCustomer,
  updateCustomer,
  getMyTickets,
  getMyData,
} = require("../controllers/customerController");

router.route("/tickets/:user").get(getMyTickets);
router
  .route("/:user")
  .delete(deleteCustomer)
  .put(updateCustomer)
  .get(getMyData);

module.exports = router;
