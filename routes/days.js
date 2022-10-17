const express = require('express');
const { getDaysWithAvailableSlot } = require("../controller/days");
const daysRouter = express.Router();
daysRouter.use(express.json());

daysRouter
  .route("/days-with-available-slot")
  .get(getDaysWithAvailableSlot);

module.exports = daysRouter;