const { Router } = require("express");
const router = Router();
const {
  updateAirline,
} = require("../controllers/airlineController");

router
  .route("/:id")
  .put(updateAirline);

module.exports = router;
