const { Router } = require("express");
const router = Router();
const {
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
  addCustomer,
} = require("../controllers/customerController");

router.route("/").get(getAllCustomers).post(addCustomer);
router
  .route("/:id")
  .get(getCustomerById)
  .delete(deleteCustomer)
  .put(updateCustomer);

module.exports = router;
