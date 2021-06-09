/*DELETE TABLES*/
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS beer_tickets;
DROP TYPE IF EXISTS status;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  email TEXT,
  password TEXT,
  profile_picture_url TEXT,
  profile_picture_hashed_name TEXT,
  profile_picture_alt_text TEXT,
  available_beer_tickets INTEGER
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  friend_id INTEGER,
  is_user_favourite BOOLEAN
);

CREATE TYPE status AS ENUM ('available', 'redeemed', 'void');
CREATE TABLE beer_tickets (
  id SERIAL PRIMARY KEY,
  giver_id INTEGER,
  receiver_id INTEGER,
  beer_status status,
  beer_expiry_date DATE,
  beer_redeemed_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


/*COMMAND TO RUN
syntax: psql -f <PATH_TO_FILE> 
or: \i <PATH_TO_FILE>

// command for local desktop
\i /home/eddiejpot/rocket-academy/bootcamp/projects/project-2-brb/beer-right-back/sql/reboot_tables.sql

// command for aws
psql -d brb_app -f /home/ubuntu/ra-projects/project-2-brb/sql/reboot_tables.sql


// command for heroku
heroku pg:psql < sql/reboot_tables.sql
*/
