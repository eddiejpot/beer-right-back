/*DELETE TABLES*/
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS beer_exchange;
DROP TYPE IF EXISTS status;


/*CREATE TABLES*/
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  email TEXT,
  password TEXT,
  -- profile_picture IMAGE,
  beer_wallet INTEGER
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  friend_id TEXT,
  is_user_favourite BOOLEAN
);

CREATE TYPE status AS ENUM ('available', 'redeemed', 'void');
CREATE TABLE beer_exchange (
  id SERIAL PRIMARY KEY,
  giver_id INTEGER,
  receiver_id INTEGER,
  beer_status status,
  beer_expiry_date DATE
);


/*COMMAND TO RUN
syntax: psql -f <PATH_TO_FILE> 
or: \i <PATH_TO_FILE>
\i /home/eddiejpot/rocket-academy/bootcamp/projects/project-2-brb/beer-right-back/sql/reboot_tables.sql
*/
