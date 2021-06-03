-- users data
INSERT INTO users (username, email, password, available_beer_tickets) VALUES ('eddie', 'eddie@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 3);
INSERT INTO users (username, email, password, available_beer_tickets) VALUES ('kai', 'kai@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 4);
INSERT INTO users (username, email, password, available_beer_tickets) VALUES ('akira', 'akira@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 4);
INSERT INTO users (username, email, password, available_beer_tickets) VALUES ('jo', 'jo@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 5);
INSERT INTO users (username, email, password, available_beer_tickets) VALUES ('effy', 'effy@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 5);
INSERT INTO users (username, email, password, available_beer_tickets) VALUES ('yiqing', 'yiqing@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 5);
INSERT INTO users (username, email, password, available_beer_tickets) VALUES ('beerFreak', 'bff@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 5);


-- friends data
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 3, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 5, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 7, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (2, 4, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (2, 6, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (3, 1, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (3, 5, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (3, 7, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (4, 2, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (4, 6, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (5, 1, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (5, 3, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (5, 7, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (6, 2, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (6, 4, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (7, 1, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (7, 3, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (7, 5, true);

-- beer ticket
-- beer_status ('available','redeemed','void')
-- addition default created_at
INSERT INTO beer_tickets (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES (2,1,'available','2021-07-01');
INSERT INTO beer_tickets (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES (3,1,'available','2021-06-10');

INSERT INTO beer_tickets (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES (1,3,'available','2021-07-04');
INSERT INTO beer_tickets (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES (1,4,'available','2021-07-05');

/*COMMAND TO RUN
syntax: psql -f <PATH_TO_FILE> 
or: \i <PATH_TO_FILE>

// command for local desktop
\i /home/eddiejpot/rocket-academy/bootcamp/projects/project-2-brb/beer-right-back/sql/seed.sql
*/