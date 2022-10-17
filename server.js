const express = require("express");
const daysRouter = require("./routes/days");
const appointmentsRouter = require("./routes/appointments");
const { setSocketRoute } = require("./routes/socket");

const app = express();

app.use("/days", daysRouter);
app.use("/appointments", appointmentsRouter);

const server = setSocketRoute(app);
server.listen(8080, () => console.log("server running 8080"));

module.exports = app;