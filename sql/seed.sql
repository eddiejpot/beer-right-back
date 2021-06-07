-- in the seed data all users will have the same password
-- 1234 hashed
-- d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db

-- users data
INSERT INTO users (username, email, password, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('eddie', 'eddie@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'a61960b050e949b53bc42533d6097ef0' , 'alt-text-eddie', 3);

INSERT INTO users (username, email, password, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('kai', 'kai@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', '463bdda53a44459a58cea0977272b5d9' , 'alt-text-kai', 5);

INSERT INTO users (username, email, password, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('akira', 'akira@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', '1971bdabb94a72f9ebc249609b82631e' , 'alt-text-akira', 5);

INSERT INTO users (username, email, password, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('jo', 'jo@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', '16a1ab7e6917b401b1db5ffc7e5795ab' , 'alt-text-jo', 4);

INSERT INTO users (username, email, password, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('effy', 'effy@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', '06d6c1c21ade5a40a095e88758294acc' , 'alt-text-effy', 4);

INSERT INTO users (username, email, password, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('yiqing', 'yiqing@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', '21c7ba1eb6d90ef658bfd8070fc23231' , 'alt-text-yiqing', 4);

INSERT INTO users (username, email, password, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('sam', 'sam@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', '256a0b414633c84efcfb608a3e09834f' , 'alt-text-sam', 5);

INSERT INTO users (username, email, password, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('zeph', 'zeph@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'b2d54ece73d086c53623679adb406b9b' , 'alt-text-zeph', 5);

INSERT INTO users (username, email, password, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('teddy', 'teddy@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 'ce0e9836fb884bb9121f2155472cb552' , 'alt-text-teddy', 5);

INSERT INTO users (username, email, password, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ('keeyee', 'keeyee@gmail.com', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', '61c1efe6cafed0981cf1768e37c795f2' , 'alt-text-keeyee', 5);


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