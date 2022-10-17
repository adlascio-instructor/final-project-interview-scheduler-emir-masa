const { Pool } = require("pg");
const { DAYOfWEEK, TIMESLOT, DATABASE } = require("../Utils/util");

const getDaysWithAvailableSlot = async (req, res) => {
  const pool = new Pool(DATABASE);
  const connect = await pool.connect();
  let days = {};
  let interview_query = "SELECT * FROM scheduler.interviewer";
  let operaion_days_query = "SELECT * FROM scheduler.day";
  let timeslot_query = "SELECT DISTINCT time FROM scheduler.appointment";
  let intereviewers = await connect.query(interview_query);
  let intereviewers_num = intereviewers.rows.length;
  let operaion_days = await connect.query(operaion_days_query);
  let operaion_days_num = operaion_days.rows.length;
  let timeslot = await connect.query(timeslot_query);
  let timeslot_num = timeslot.rows.length;

  for (day = 1; day <= operaion_days_num; day++) {
    let day_available_spots = intereviewers_num;
    for (slot = 1; slot <= timeslot_num; slot++) {
      let query = `SELECT * FROM scheduler.interview 
    JOIN scheduler.appointment ON scheduler.interview.appointment_id = scheduler.appointment.id
    JOIN scheduler.day ON scheduler.appointment.day_id = scheduler.day.id
    WHERE scheduler.day.week_name = '${DAYOfWEEK[day]}' AND scheduler.appointment.time = '${TIMESLOT[slot]}'
  `;
      let result = await connect.query(query);
      if (result.rows.length == intereviewers_num) {
        day_available_spots--;
      }
    }
    let dayObj = {
      id: day,
      name: DAYOfWEEK[day],
      spots: day_available_spots,
    };
    days[DAYOfWEEK[day]] = dayObj;
  }
  await connect.release();
  res.json(days);
};

module.exports = {
  getDaysWithAvailableSlot,
};
