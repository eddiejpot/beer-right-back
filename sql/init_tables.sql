/*CREATE TABLES*/

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  email TEXT,
  password TEXT,
  -- profile_picture IMAGE,
  beer_wallet INTEGER
);

CREATE TABLE IF NOT EXISTS friends (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  friend_id TEXT,
  is_favourite BOOLEAN
);

CREATE TYPE IF NOT EXISTS status AS ENUM ('available', 'redeemed', 'void');
CREATE TABLE IF NOT EXISTS beer_exchange (
  id SERIAL PRIMARY KEY,
  giver_id INTEGER,
  receiver_id INTEGER,
  beer_status status,
  beer_expiry_date DATE
);


/*COMMAND TO RUN
syntax: psql -f <PATH_TO_FILE> 
or: \i <PATH_TO_FILE>
\i /home/eddiejpot/rocket-academy/bootcamp/projects/project-2-brb/beer-right-back/sql/init_tables.sql
*/
