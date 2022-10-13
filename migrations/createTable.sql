-- CREATE TABLE appointment (
--   id: serial primary key,
--   time: varchar(255),
--   day_id: integer
-- )

-- CREATE TABLE available_interviewer (
--   id: serial primary key,
--   interviewer_id: integer,
--   day_id: integer
-- )

-- CREATE TABLE day (
--   id: serial primary key,
--   week_name: varchar(255)
-- )

-- CREATE TABLE interview (
--   id: serial primary key,
--   student: varchar(255),
--   interviewer_id: integer,
--   appointment: integer 
-- )

-- CREATE TABLE interviewer (
--   id: serial primary key,
--   name: varchar(255),
--   avatar: text
-- )

 SELECT * FROM appointment;