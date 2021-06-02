/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
// others
import moment from 'moment'; // npm install moment
// hashing
import jsSHA from 'jssha';
// database stuff (postgres)
import pool from '../models/dbConfig.mjs';

/* ============================================================================ */
/* ======================================================= MIDDLEWARE FUNCTIONS */
/* ============================================================================ */

/* ============================================================================ */
/* =========================================================== HELPER FUNCTIONS */
/* ============================================================================ */

// Helper functions to get userdata using promises

const getCurrentUserData = (currentUserId) => {
  const promise = pool
    .query(`SELECT * FROM users WHERE id = ${currentUserId}`)
    .then((result) => result.rows[0]);
  return promise;
};

const getWhoOwesUserData = (currentUserId) => {
  const arr = [];
  const promises = [];
  // Promise to query for the ID of all the people who owe current user
  const promise = pool
    .query(`SELECT giver_id FROM beer_tickets WHERE receiver_id = ${currentUserId}`)
    .then((result) => {
      // return a promise to query for the user data of those people who owe current user
      result.rows.forEach((e) => {
        promises.push(pool.query(`SELECT * FROM users WHERE id = ${e.giver_id}`));
      });
      return Promise.all(promises); })
    // fulfil the promise to query for the user data of those people who owe current user
    .then((result) => {
      result.forEach((e) => {
        // push each user data into an arr
        arr.push(e.rows[0]);
      });
      // return the arr
      return arr;
    });
  // return the promise to query for the ID of all the people who owe current user
  return promise;
};

const getUserOwesWhoData = (currentUserId) => {
  const arr = [];
  const promises = [];
  const promise = pool
    .query(`SELECT receiver_id FROM beer_tickets WHERE giver_id = ${currentUserId}`)
    .then((result) => {
      result.rows.forEach((e) => {
        promises.push(pool.query(`SELECT * FROM users WHERE id = ${e.receiver_id}`));
      });
      return Promise.all(promises); })
    .then((result) => {
      result.forEach((e) => {
        arr.push(e.rows[0]);
      });
      return arr;
    });
  return promise;
};

/* ============================================================================ */
/* ================================================================ CONTROLLERS */
/* ============================================================================ */

// Older code for userDashboardController
export const userDashboardController = (req, res) => {
  console.log('Inside ----> userDashboardController');
  // get data needed
  const { userId } = req;

  // helper functions
  // helper function that returns a promise to get an array
  const queryForWhoOwesUser = (arrToLoopThrough, insertUserId) => {
    const promises = [];
    arrToLoopThrough.forEach((e) => {
      promises.push(pool.query(`SELECT * FROM users WHERE id = ${e.giver_id}`));
    });
    return Promise.all(promises);
  };
  const queryForUserOwesWho = (arrToLoopThrough, insertUserId) => {
    const promises = [];
    arrToLoopThrough.forEach((e) => {
      promises.push(pool.query(`SELECT * FROM users WHERE id = ${e.receiver_id}`));
    });
    return Promise.all(promises);
  };

  const dataINeed = { currentUserData: [], userOwesWho: [], whoOwesUser: [] };
  // Query for logged in user
  pool
    .query(`SELECT * FROM users WHERE id = ${userId}`)

    // Save into dataINeed (userData)
    .then((result) => {
      dataINeed.currentUserData.push(result.rows[0]);
      // return query for people that owe user
      return pool.query(`SELECT giver_id FROM beer_tickets WHERE receiver_id = ${userId}`);
    })
    // use helper function that returns a promise to get an array of people that owe user
    .then((result) => queryForWhoOwesUser(result.rows, userId))
    // Save into dataINeed
    .then((result) => {
      result.forEach((e) => {
        dataINeed.whoOwesUser.push(e.rows[0]);
      });
      // return query for people that user owes
      return pool.query(`SELECT receiver_id FROM beer_tickets WHERE giver_id = ${userId}`);
    })
    // use helper function that returns a promise to get an array of people that the user owes
    .then((result) => queryForUserOwesWho(result.rows, userId))
    // Save into dataINeed
    .then((result) => {
      result.forEach((e) => {
        dataINeed.userOwesWho.push(e.rows[0]);
      });

      // render page
      res.status(200).render('index', {
        userName: dataINeed.currentUserData[0].username.toUpperCase(),
        beerWallet: dataINeed.currentUserData[0].available_beer_tickets,
        whoOwesUserArr: dataINeed.whoOwesUser,
        userOwesWhoArr: dataINeed.userOwesWho,
      });
    });
};

// ' /profile '

export const profileController = (req, res) => {
};

// ' /transactions '
export const transactionsController = (req, res) => {
  console.log('Inside ----> transactionsController');
  // get userId
  const { userId } = req;
  // const get data
  const getDataAndRender = async () => {
    // get data needed
    const usersAndBeerTicketsData = await getUsersAndBeerTicketsData(userId);

    // make edits for all transactions option
    // add in type
    usersAndBeerTicketsData.beersOwedToUser.forEach((e) => e.type = 'oweMe');
    usersAndBeerTicketsData.beersUserOwes.forEach((e) => e.type = 'iOwe');
    // combine arr
    const combinedData = [...usersAndBeerTicketsData.beersOwedToUser, ...usersAndBeerTicketsData.beersUserOwes];

    // render page
    res.status(200).render('transactions', {
      title: '',
      page: '',
      desc: '',
      beersOwedToUserArr: usersAndBeerTicketsData.beersOwedToUser,
      beersUserOwesArr: usersAndBeerTicketsData.beersUserOwes,
      combinedData,
    });
  };
  // execute
  getDataAndRender();
};

// ' /transactions/:sort '
export const transactionsSortController = (req, res) => {
};

// ' /contacts '
export const contactsController = (req, res) => {
  res.status(200).render('contacts', {
    title: '',
    page: '',
    desc: '',
    // user_id: req.cookies.user_id,
  });
};

// ' /beer/buy'
export const beerBuyController = (req, res) => {
  res.status(200).render('beerBuy', {
    title: '',
    page: '',
    desc: '',
    // user_id: req.cookies.user_id,
  });
};

// ' /beer/redeem '
export const beerRedeemController = (req, res) => {
  res.status(200).render('beerRedeem', {
    title: '',
    page: '',
    desc: '',
    // user_id: req.cookies.user_id,
  });
};

// ' /beer/brand-new-ticket/:id '
export const beerBrandNewTicketController = (req, res) => {
  res.status(200).render('brandNewBeerTicket', {
    title: '',
    page: '',
    desc: '',
    // user_id: req.cookies.user_id,
  });
};

// ' /beer/ticket/:id '
export const beerTicketController = (req, res) => {
  res.status(200).render('beerTicket', {
    title: '',
    page: '',
    desc: '',
    // user_id: req.cookies.user_id,
  });
};
