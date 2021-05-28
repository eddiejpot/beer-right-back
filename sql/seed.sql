-- users data
INSERT INTO users (username, email, password, beer_wallet) VALUES ('eddie', 'eddie@gmail.com', 1234, 5);
INSERT INTO users (username, email, password, beer_wallet) VALUES ('kai', 'kai@gmail.com', 1234, 5);
INSERT INTO users (username, email, password, beer_wallet) VALUES ('akira', 'akira@gmail.com', 1234, 5);
INSERT INTO users (username, email, password, beer_wallet) VALUES ('jo', 'jo@gmail.com', 1234, 5);
INSERT INTO users (username, email, password, beer_wallet) VALUES ('effy', 'effy@gmail.com', 1234, 5);
INSERT INTO users (username, email, password, beer_wallet) VALUES ('yiqing', 'yiqing@gmail.com', 1234, 5);


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

-- beer exchange
INSERT INTO beer_ticket (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES ();
