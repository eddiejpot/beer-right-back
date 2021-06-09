-- in the seed data all users will have the same password
-- 1234 hashed
-- d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db

-- users data
INSERT INTO users (username, email, password, profile_picture_url, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('eddie', 'eddie@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'https://beer-right-back-01.s3.ap-southeast-1.amazonaws.com/1623232196809', '1623232196809', 'alt-text-eddie', 3);

INSERT INTO users (username, email, password, profile_picture_url, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('kai', 'kai@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'https://beer-right-back-01.s3.ap-southeast-1.amazonaws.com/1623232279684', '1623232279684' , 'alt-text-kai', 5);

INSERT INTO users (username, email, password, profile_picture_url, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('akira', 'akira@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'https://beer-right-back-01.s3.ap-southeast-1.amazonaws.com/1623232366624', '1623232366624' , 'alt-text-akira', 5);

INSERT INTO users (username, email, password, profile_picture_url, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('jo', 'jo@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'https://beer-right-back-01.s3.ap-southeast-1.amazonaws.com/1623232409183', '1623232409183' , 'alt-text-jo', 4);

INSERT INTO users (username, email, password, profile_picture_url, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('effy', 'effy@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'https://beer-right-back-01.s3.ap-southeast-1.amazonaws.com/1623232460911' , '1623232460911', 'alt-text-effy', 4);

INSERT INTO users (username, email, password, profile_picture_url, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('yiqing', 'yiqing@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'https://beer-right-back-01.s3.ap-southeast-1.amazonaws.com/1623232497388' , '1623232497388','alt-text-yiqing', 4);

INSERT INTO users (username, email, password, profile_picture_url, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('sam', 'sam@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'https://beer-right-back-01.s3.ap-southeast-1.amazonaws.com/1623232546936' , '1623232546936','alt-text-sam', 5);

INSERT INTO users (username, email, password, profile_picture_url, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('zeph', 'zeph@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'https://beer-right-back-01.s3.ap-southeast-1.amazonaws.com/1623232579682' , '1623232579682','alt-text-zeph', 5);

INSERT INTO users (username, email, password, profile_picture_url, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('teddy', 'teddy@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'https://beer-right-back-01.s3.ap-southeast-1.amazonaws.com/1623232606853' , '1623232606853','alt-text-teddy', 5);

INSERT INTO users (username, email, password, profile_picture_url, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('keeyee', 'keeyee@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'https://beer-right-back-01.s3.ap-southeast-1.amazonaws.com/1623232631254' , '1623232631254','alt-text-keeyee', 5);


-- friends data (onlly doing for first 5 for mp)
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 2, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 3, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 4, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 5, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 6, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 7, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 8, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 9, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (1, 10, true);

INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (2, 1, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (2, 3, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (2, 4, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (2, 5, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (2, 6, true);

INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (3, 1, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (3, 4, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (3, 5, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (3, 6, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (3, 7, true);

INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (4, 1, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (4, 2, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (4, 3, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (4, 5, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (4, 6, true);

INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (5, 1, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (5, 2, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (5, 3, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (5, 4, true);
INSERT INTO friends (user_id, friend_id, is_user_favourite) VALUES (5, 6, true);


-- beer ticket data
-- beer_status ('available','redeemed','void')
-- addition default created_at
-- only doing for eddie for mvp
INSERT INTO beer_tickets (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES (1,2,'available','2021-06-20');
INSERT INTO beer_tickets (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES (1,3,'available','2021-06-14');

INSERT INTO beer_tickets (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES (4,1,'available','2021-06-10');
INSERT INTO beer_tickets (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES (5,1,'available','2021-06-15');
INSERT INTO beer_tickets (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES (6,1,'available','2021-06-20');

/*COMMAND TO RUN
syntax: psql -f <PATH_TO_FILE> 
or: \i <PATH_TO_FILE>

// command for local desktop
\i /home/eddiejpot/rocket-academy/bootcamp/projects/project-2-brb/beer-right-back/sql/seed.sql

// command for aws
psql -d brb_app -f /home/ubuntu/ra-projects/project-2-brb/sql/seed.sql
*/