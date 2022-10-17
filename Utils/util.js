const DAYOfWEEK = {
  1 : "Monday",
  2 : "Tuesday",
  3 : "Wednesday",
  4 : "Thursday",
  5 : "Friday"
};

const TIMESLOT = {
  1 : "1PM",
  2 : "2PM",
  3 : "3PM",
  4 : "4PM",
  5 : "5PM"
};

const DATABASE = {
  host: "localhost",
  database: "interview_scheduler",
  port: 5432,
}

module.exports = { DAYOfWEEK, TIMESLOT, DATABASE};