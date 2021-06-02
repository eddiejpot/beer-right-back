SELECT * FROM users; SELECT * FROM friends; SELECT * FROM beer_tickets;


SELECT users.username FROM users INNER JOIN beer_tickets ON users.id = beer_tickets.giver_id WHERE users.id = 1;

SELECT giver_id FROM beer_tickets WHERE receiver_id = 1;

-- data of those who owe user a beer
SELECT * FROM users INNER JOIN beer_tickets ON users.id = beer_tickets.giver_id WHERE beer_tickets.receiver_id = 1;

-- data of those who are owed a beer by user
SELECT * FROM users INNER JOIN beer_tickets ON users.id = beer_tickets.receiver_id WHERE beer_tickets.giver_id = 1;

-- friends data
SELECT users.id, users.username, friends.friend_id FROM users INNER JOIN friends ON friends.friend_id = users.id WHERE friends.user_id = 1;

-- beer giver data
SELECT users.username FROM users INNER JOIN beer_tickets ON beer_tickets.giver_id = users.id WHERE beer_tickets.id = 1;
-- beer reciever data
SELECT users.username FROM users INNER JOIN beer_tickets ON beer_tickets.receiver_id = users.id WHERE beer_tickets.id = 1;



--update 
UPDATE beer_tickets SET beer_status  = 'available', beer_redeemed_date = null WHERE id = 1;

UPDATE beer_tickets SET beer_status  = 'redeemed', beer_redeemed_date = '2021-06-01' WHERE id = 4;