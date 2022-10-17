-- /Applications/Postgres.app/Contents/Versions/14/bin/psql -p5432 "interview_scheduler"

DROP SCHEMA scheduler CASCADE;

CREATE SCHEMA scheduler;

 CREATE TABLE scheduler.day (
  id serial primary key,
  week_name varchar(255)
);

CREATE TABLE scheduler.interviewer (
  id serial primary key,
  name varchar(255),
  avatar text
);
 
 CREATE TABLE scheduler.appointment (
  id serial primary key,
  time varchar(255),
  day_id integer REFERENCES scheduler.day (id)
);

CREATE TABLE scheduler.interview (
  id serial primary key,
  student varchar(255),
  interviewer_id integer REFERENCES scheduler.interviewer (id),
  appointment_id integer REFERENCES scheduler.appointment (id)
);

CREATE TABLE scheduler.available_interviewer (
  id serial primary key,
  interviewer_id integer REFERENCES scheduler.interviewer (id),
  day_id integer REFERENCES scheduler.day (id)
);

SELECT * FROM scheduler.day;
SELECT * FROM scheduler.interviewer;
SELECT * FROM scheduler.interview;
SELECT * FROM scheduler.appointment;
SELECT * FROM scheduler.available_interviewer;