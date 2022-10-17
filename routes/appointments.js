const express = require('express');
const { getAvailableInterviewers } = require("../controller/appointments") ;

const appointmentsRouter = express.Router();
appointmentsRouter.use(express.json());

appointmentsRouter
  .route("/available-interviewers")
  .get(getAvailableInterviewers);

module.exports = appointmentsRouter;