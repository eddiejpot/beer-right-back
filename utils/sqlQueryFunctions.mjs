/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
// others
import moment from 'moment'; // npm install moment
// hashing
import jsSHA from 'jssha';
// database stuff (postgres)
import pool from '../models/dbConfig.mjs';

// get list of users
export const getUsers = async () => {
  const promise = await pool.query('SELECT * FROM users');
  return promise.rows;
};

export const getCurrentUserData = (currentUserId) => {
  const promise = pool
    .query(`SELECT * FROM users WHERE id = ${currentUserId}`)
    .then((result) => result.rows[0])
    .catch((err) => console.log(`getCurretUserData FAILED ${err}`));
  return promise;
};

export const getWhoOwesUserData = async (currentUserId) => {
  const arr = [];
  const promises = [];
  // Promise to query for the ID of all the people who owe current user
  const promise1 = await pool.query(`SELECT giver_id FROM beer_tickets WHERE receiver_id = ${currentUserId} AND beer_tickets.beer_status = 'available'`);
  // promise to query for the user data of those people who owe current user
  promise1.rows.forEach((e) => {
    promises.push(pool.query(`SELECT * FROM users WHERE id = ${e.giver_id}`));
  });
  // fufill promise to query for the user data of those people who owe current user
  const promise2 = await Promise.all(promises);
  // return the promise to query for the ID of all the people who owe current user
  promise2.forEach((e) => {
    // push each user data into an arr
    arr.push(e.rows[0]);
  });
  // return the arr
  return arr;
};

export const getUserOwesWhoData = async (currentUserId) => {
  const arr = [];
  const promises = [];
  // Promise to query for the ID of all the people that current user owes
  const promise1 = await pool.query(`SELECT receiver_id FROM beer_tickets WHERE giver_id = ${currentUserId}AND beer_tickets.beer_status = 'available'`);
  // promise to query for the user data of all the people that current user owes
  promise1.rows.forEach((e) => {
    promises.push(pool.query(`SELECT * FROM users WHERE id = ${e.receiver_id}`));
  });
  // fufill promise to query for the user data of all the people that current user owes
  const promise2 = await Promise.all(promises);
  // return the promise to query for the ID of all the people that current user owes
  promise2.forEach((e) => {
    // push each user data into an arr
    arr.push(e.rows[0]);
  });
  // return the arr
  return arr;
};

// Helper function to get user and beer data
// (split this out from the above as this requires a join table thus is more expensive)
export const getUsersAndBeerTicketsData = async (currentUserId) => {
  const beersOwedObjArr = { beersOwedToUser: [], beersUserOwes: [] };
  // Promise to create join table for data of those who owe user a beer
  const promise1 = await pool.query(`SELECT users.id, users.username, users.profile_picture_hashed_name, users.profile_picture_alt_text, users.profile_picture_url, beer_tickets.beer_status, beer_tickets.beer_expiry_date, beer_tickets.id AS beer_ticket_id FROM users INNER JOIN beer_tickets ON users.id = beer_tickets.giver_id WHERE beer_tickets.receiver_id = ${currentUserId} AND beer_tickets.beer_status = 'available'`);
  // add data to objArr
  beersOwedObjArr.beersOwedToUser = promise1.rows;
  // Promise to create join table for data of those that the user owes a beer to
  const promise2 = await pool.query(`SELECT users.id, users.username, profile_picture_hashed_name, profile_picture_alt_text, beer_tickets.beer_status, beer_tickets.beer_expiry_date, beer_tickets.id AS beer_ticket_id FROM users INNER JOIN beer_tickets ON users.id = beer_tickets.receiver_id WHERE beer_tickets.giver_id = ${currentUserId} AND beer_tickets.beer_status = 'available'`);
  // add data to objAarr
  beersOwedObjArr.beersUserOwes = promise2.rows;
  // return objArr
  return beersOwedObjArr;
};

// Helper function to get user and beer data that has been redeemed!
// (split this out from the above as this requires a join table thus is more expensive)
export const getUsersAndBeerTicketsRedeemedData = async (currentUserId) => {
  const beersOwedObjArr = { beersOwedToUser: [], beersUserOwes: [] };
  // Promise to create join table for data of those who owe user a beer
  const promise1 = await pool.query(`SELECT users.id, users.username, profile_picture_hashed_name, profile_picture_alt_text, beer_tickets.beer_status, beer_tickets.beer_redeemed_date, beer_tickets.id AS beer_ticket_id FROM users INNER JOIN beer_tickets ON users.id = beer_tickets.giver_id WHERE beer_tickets.receiver_id = ${currentUserId} AND beer_tickets.beer_status = 'redeemed'`);
  // add data to objArr
  beersOwedObjArr.beersOwedToUser = promise1.rows;
  // Promise to create join table for data of those that the user owes a beer to
  const promise2 = await pool.query(`SELECT users.id, users.username, profile_picture_hashed_name, profile_picture_alt_text, beer_tickets.beer_status, beer_tickets.beer_redeemed_date, beer_tickets.id AS beer_ticket_id FROM users INNER JOIN beer_tickets ON users.id = beer_tickets.receiver_id WHERE beer_tickets.giver_id = ${currentUserId} AND beer_tickets.beer_status = 'redeemed'`);
  // add data to objAarr
  beersOwedObjArr.beersUserOwes = promise2.rows;
  // return objArr
  return beersOwedObjArr;
};

// Helper function to get user friends
export const getUserFriends = (currentUserId) => {
  // Promise to create join table for data of those who owe user a beer
  const promise = pool
    .query(`SELECT * FROM users INNER JOIN friends ON friends.friend_id = users.id WHERE friends.user_id = ${currentUserId}`)
    .then((result) => result.rows)
    .catch((err) => console.log(`getCurretUserData FAILED ${err}`));
  return promise;
};

// // Helper function to get beer ticket data
export const getBeerTicketData = (beerTicketId) => {
  const beerTicketData = {};
  // Promise to get beer ticket data
  const ticketData = pool
    .query(`SELECT * FROM beer_tickets WHERE id = ${beerTicketId}`)
    .then((result) => {
      beerTicketData.ticketData = result.rows[0];
    });

  const giverData = pool
    .query(`SELECT users.username, users.id FROM users INNER JOIN beer_tickets ON beer_tickets.giver_id = users.id WHERE beer_tickets.id = ${beerTicketId}`)
    .then((result) => {
      beerTicketData.giverName = result.rows[0].username;
      beerTicketData.giverId = result.rows[0].id;
    });

  const recieverData = pool
    .query(`SELECT users.username, users.id FROM users INNER JOIN beer_tickets ON beer_tickets.receiver_id = users.id WHERE beer_tickets.id = ${beerTicketId}`)
    .then((result) => {
      beerTicketData.receiverName = result.rows[0].username;
      beerTicketData.receiverId = result.rows[0].id;
    });

  return Promise.all([ticketData, giverData, recieverData]).then(() => beerTicketData);
};

// // Helper function to get beer ticket data (async)
// export const getBeerTicketData = async (beerTicketId) => {
//   const beerTicketData = {};
//   // Promise to get beer ticket data
//   const promise1 = await pool.query(`SELECT * FROM beer_tickets WHERE id = ${beerTicketId}`);
//   [beerTicketData.ticketData] = promise1.rows;
//   // promise to get giverName
//   const promise2 = await pool.query(`SELECT users.username, users.id FROM users INNER JOIN beer_tickets ON beer_tickets.giver_id = users.id WHERE beer_tickets.id = ${beerTicketId}`);
//   beerTicketData.giverName = promise2.rows[0].username;
//   beerTicketData.giverId = promise2.rows[0].id;
//   // promise to get receiverName
//   const promise3 = await pool.query(`SELECT users.username, users.id FROM users INNER JOIN beer_tickets ON beer_tickets.receiver_id = users.id WHERE beer_tickets.id = ${beerTicketId}`);
//   beerTicketData.receiverName = promise3.rows[0].username;
//   beerTicketData.receiverId = promise3.rows[0].id;
//   // return arr
//   return beerTicketData;
// };
