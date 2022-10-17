const express = require('express');
const route = express.Router();
const { Pool } = require("pq")

const dbCredentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

route.get("/appointments/:dayId", (req,res) =>{
    const pool = new Pool(dbCredentials);
    pool
        .query(`SELECT appointments.id, time, interviews.student, interviewers.name, interviewers.avatar
            FROM appointments
            INNER JOIN interviews
            ON appointments.id = interviews.appointment_id
            INNER JOIN interviewers ON interviews.interviewer_id = interviewers.id
            WHERE day_id = ${req.params.dayId}`)
        .then((result) => {
            return (
                result.rows
            )
        })
        .then((appointments) => {
            console.log(appointments)
            appointments = appointments.map((appointment)=>{
                return {
                    id: appointment.id,
                    time: appointment.time,
                    interview:{
                        student: appointment.student,
                        interviewers:{
                            name: appointment.name,
                            avatar: appointment.avatar
                        }
                    }
                }
            })
            res.json(appointments) 
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=> pool.end());
         

})

module.exports = route;