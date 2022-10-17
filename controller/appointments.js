const { Pool } = require("pg");
const { DAYOfWEEK, TIMESLOT, DATABASE } = require("../Utils/util");

const getAvailableInterviewers = async (req, res) => {
  let day = DAYOfWEEK[Number(req.params.id)];
  const pool = new Pool(DATABASE);
  const connect = await pool.connect();

  let timeslot_query = "SELECT DISTINCT time FROM scheduler.appointment";
  let timeslot = await connect.query(timeslot_query);
  let timeslot_num = timeslot.rows.length;
  let interviewersPerSlot = {};
  for (slot = 1; slot <= timeslot_num; slot++) {
    let query = `SELECT * FROM scheduler.interviewer
    WHERE scheduler.interviewer.id NOT IN (SELECT scheduler.interviewer.id FROM scheduler.interviewer
    JOIN scheduler.interview ON scheduler.interviewer.id = scheduler.interview.interviewer_id
    JOIN scheduler.appointment ON scheduler.interview.appointment_id = scheduler.appointment.id
    JOIN scheduler.day ON scheduler.appointment.day_id = scheduler.day.id
    WHERE scheduler.day.week_name = '${day}' AND scheduler.appointment.time = '${TIMESLOT[slot]}')
   `;

    let result = await connect.query(query);
    let interviewers = [];
    result.rows.forEach(row=> {
      let availableInterviewerObj = {
        id: row['id'],
        name: row['name'],
        avatar: row['avatar'],
      }
      interviewers.push(availableInterviewerObj);
    });

    interviewersPerSlot[slot] = {
      day: day,
      slot: TIMESLOT[slot],
      interviewers: interviewers
    };
  }
  
  await connect.release();
  res.json(interviewersPerSlot);
};

module.exports = {
  getAvailableInterviewers
};
