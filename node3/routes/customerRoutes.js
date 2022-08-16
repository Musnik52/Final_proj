const { Router } = require("express");
const router = Router();
const {
  deleteCustomer,
  updateCustomer,
  // getMyTickets,
} = require("../controllers/customerController");

// router.route("/:id/tickets").get(getMyTickets)
router
  .route("/:id")
  .delete(deleteCustomer)
  .put(updateCustomer);

module.exports = router;
