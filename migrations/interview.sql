CREATE TABLE interview (
  id: serial primary key,
  student: varchar(255),
  interviewer_id: integer,
  appointment: integer 
)