const express = require("express");
const { Pool } = require("pq");
require ("dotenv").config()
const interviewRoutes =  require("./routes/interview");
const interviewerRoutes = require("./routes/interviewer");
const availableDaysRoutes = require("./routes/availableDay")
const appointmentRoutes = require("./routes/appointment")
const cors = require("cors")

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

const dbCredentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

server.use(interviewRoutes);
server.use(interviewerRoutes);
server.use(availableDaysRoutes);
server.use(appointmentRoutes);

server.get("/available_interviewers", (req, res) => {
    const pool = new Pool(dbCredentials)
    pool   
        .query("SELECT * FROM available_interviewers JOINS days WHERE" )
        .then((result) => result.rows)
        .then((available_interviewers) => res.json(available_interviewers))
        .catch((err) => console.log(err))
        .finally(() => pool.end())
});


server.listen(8000, ()=> console.log("Server is running on port 8000"));


