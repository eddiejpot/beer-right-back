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
/* ==================================================== IMPORT HELPER FUNCTIONS */
/* ============================================================================ */

import {
  getCurrentUserData,
  getWhoOwesUserData,
  getUserOwesWhoData,
  getUsersAndBeerTicketsData,
  getUsersAndBeerTicketsRedeemedData,
  getUserFriends,
  getBeerTicketData,
} from './sqlQueryFunctions.mjs';

/* ============================================================================ */
/* ======================================================= MIDDLEWARE FUNCTIONS */
/* ============================================================================ */
import {
  returnCookiesIfLoggedInMiddleware,
} from './authFunctions.mjs';

/* ============================================================================ */
/* ================================================================ CONTROLLERS */
/* ============================================================================ */

/* ================================================================ BEER EXCHANGE */
export const userDashboardController = (req, res) => {
  console.log('Inside ----> userDashboardController');
  // get userId
  const { userId } = req;

  const getDataAnRenderPage = async () => {
    // get data needed
    const currentUserData = await getCurrentUserData(userId);
    const whoOwesUserArr = await getWhoOwesUserData(userId);
    const userOwesWhoArr = await getUserOwesWhoData(userId);
    // render page
    res.status(200).render('index', {
      userName: currentUserData.username.toUpperCase(),
      beerWallet: currentUserData.available_beer_tickets,
      whoOwesUserArr,
      userOwesWhoArr,
    });
  };
  // execute function
  getDataAnRenderPage();
};

/* ================================================================ USER PROFILE */
export const profileController = (req, res) => {
};

/* ================================================================ TRANSACTIONS */
// ' /transactions '
// export const transactionsController = (req, res) => {
//   console.log('Inside ----> transactionsController');
//   // get userId
//   const { userId } = req;
//   // const get data
//   const getDataAndRender = async () => {
//     // get data needed
//     const usersAndBeerTicketsData = await getUsersAndBeerTicketsData(userId);

//     // make edits for all transactions option
//     // add in type
//     usersAndBeerTicketsData.beersOwedToUser.forEach((e) => e.type = 'oweMe');
//     usersAndBeerTicketsData.beersUserOwes.forEach((e) => e.type = 'iOwe');
//     // combine arr
//     const combinedData = [...usersAndBeerTicketsData.beersOwedToUser, ...usersAndBeerTicketsData.beersUserOwes];
//     // render page
//     res.status(200).render('transactions', {
//       title: '',
//       page: '',
//       desc: '',
//       beersOwedToUserArr: usersAndBeerTicketsData.beersOwedToUser,
//       beersUserOwesArr: usersAndBeerTicketsData.beersUserOwes,
//       combinedData,
//     });
//   };
//   // execute
//   getDataAndRender();
// };

// ' /transactions/:sort '
export const transactionsSortController = (req, res) => {
  console.log('Inside ----> transactionsSortController');
  // get userId
  const { userId } = req;
  // get sort type
  const sortType = req.params.sort;

  // const get data
  const getDataAndRender = async () => {
    // get data needed
    const usersAndBeerTicketsData = await getUsersAndBeerTicketsData(userId);
    const usersAndBeerTicketsRedeemedData = await getUsersAndBeerTicketsRedeemedData(userId);

    // determine what to render depending on sort type
    let dataToRender;
    let pageTitle;
    switch (sortType) {
      case 'all': {
        pageTitle = 'ALL IN AND OUT';
        // edit and add parameter before sending to ejs
        const updatedBeersOwedToUserArr = usersAndBeerTicketsData.beersOwedToUser;
        const updatedBeersUserOwesArr = usersAndBeerTicketsData.beersUserOwes;
        updatedBeersOwedToUserArr.forEach((e) => e.type = 'oweMe');
        updatedBeersUserOwesArr.forEach((e) => e.type = 'iOwe');

        // combine arr
        dataToRender = [...usersAndBeerTicketsData.beersOwedToUser, ...usersAndBeerTicketsData.beersUserOwes];
        break;
      }
      case 'in':
        pageTitle = 'USER CAN REDEEM';
        dataToRender = usersAndBeerTicketsData.beersOwedToUser;
        break;
      case 'out':
        pageTitle = 'USER OWES';
        dataToRender = usersAndBeerTicketsData.beersUserOwes;
        break;
      case 'done': {
        pageTitle = 'REDEEMED';
        // edit and add parameter before sending to ejs
        const redeemUserArr = usersAndBeerTicketsRedeemedData.beersOwedToUser;
        redeemUserArr.forEach((e) => { e.type = 'redeemedByUser'; });
        const redeemFriendsArr = usersAndBeerTicketsRedeemedData.beersUserOwes;
        redeemFriendsArr.forEach((e) => { e.type = 'redeemedByFriend'; });

        // combine arr
        dataToRender = [...redeemUserArr, ...redeemFriendsArr];
        console.log(dataToRender);
        break;
      }
      default:
        console.log('Error on transactionsSortController');
        break;
    }
    // render page
    res.status(200).render('transactions', {
      title: '',
      page: '',
      desc: '',
      pageTitle,
      beersData: dataToRender,
      sortType,
    });
  };
  // execute
  getDataAndRender();
};

/* ================================================================ CONTACTS */
// ' /contacts '
export const contactsController = (req, res) => {
  console.log('Inside ----> contactsController');
  // get userId
  const { userId } = req;
  // get data
  const getDataAndRender = async () => {
    const userFriendsData = await getUserFriends(userId);
    // render
    res.status(200).render('contacts', {
      title: '',
      page: '',
      desc: '',
      userFriends: userFriendsData,
    });
  };
  // exeute
  getDataAndRender();
};

/* ================================================================ BEER BUY */
// ' /beer/buy'
export const beerBuyController = (req, res) => {
  console.log('Inside ----> beerBuyController');
  // get userId
  const { userId } = req;
  // get data
  const getDataAndRender = async () => {
    const userFriendsData = await getUserFriends(userId);
    const currentUserData = await getCurrentUserData(userId);
    // render
    res.status(200).render('beerBuy', {
      title: '',
      page: '',
      desc: '',
      userFriends: userFriendsData,
      beerWallet: currentUserData.available_beer_tickets,
    });
  };
  // exeute
  getDataAndRender();
};

export const beerBuyPostController = (req, res) => {
  console.log('Inside ----> beerBuyPostController');
  // get userId
  const { userId } = req;
  // get form data
  const formData = req.body;
  // get friend Id
  const friendId = Number(formData.friendId);
  console.log(friendId);
  // get date (one-month from now)
  const dateOneMonthFromNow = moment().add(1, 'months').format('YYYY-MM-DD');

  // update beer_tickets table
  const getDataAndRender = async () => {
    let beerTicketId = '';

    const dataToInsert = [userId, friendId, 'available', dateOneMonthFromNow];
    const updateBeerTicketsTable = await pool.query('INSERT INTO beer_tickets (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES ($1, $2, $3, $4) RETURNING*', dataToInsert);
    console.log(`Success in adding to beer_tickets! ${updateBeerTicketsTable.rows}`);
    beerTicketId = updateBeerTicketsTable.rows[0].id;

    const updateBeerWallet = await pool.query(`UPDATE users SET available_beer_tickets  = available_beer_tickets - 1 WHERE id = ${userId} RETURNING*`);
    console.log(`Success in editng user.available_beer_tickets! ${updateBeerWallet.rows}`);

    const beerTicketData = await getBeerTicketData(beerTicketId);

    // // render
    res.status(200).render('brandNewBeerTicket', {
      title: '',
      page: '',
      desc: '',
      beerTicketId,
      giverName: beerTicketData.giverName,
      receiverName: beerTicketData.receiverName,
      beerTicketData: beerTicketData.ticketData,
    });
  };
  // execute
  getDataAndRender();
};

/* ================================================================ BEER REDEEM */
// ' /beer/redeem '
export const beerRedeemController = (req, res) => {
  console.log('Inside ----> beerRedeemController');
  // get userId
  const { userId } = req;
  // const get data
  const getDataAndRender = async () => {
    // get data needed
    const usersAndBeerTicketsData = await getUsersAndBeerTicketsData(userId);
    // get those that owe current user
    const peopleWhoOweUser = usersAndBeerTicketsData.beersOwedToUser;

    // change date format
    console.log(peopleWhoOweUser);
    peopleWhoOweUser.forEach((e) => e.beer_expiry_date_edit = moment(e.beer_expiry_date).fromNow());
    console.log(peopleWhoOweUser);
    // render page
    res.status(200).render('beerRedeem', {
      title: '',
      page: '',
      desc: '',
      peopleWhoOweUserArr: peopleWhoOweUser,
    });
  };
  // execute
  getDataAndRender();
};

/* ================================================================ BEER TICKETS */

// ' /beer/brand-new-ticket/:id '
export const beerBrandNewTicketController = (req, res) => {
  console.log('Inside ----> beerBrandNewTicketController');
  res.status(200).render('brandNewBeerTicket', {
    title: '',
    page: '',
    desc: '',
    // user_id: req.cookies.user_id,
  });
};

// ' /beer/ticket/:id '
export const beerTicketController = (req, res) => {
  console.log('Inside ----> beerTicketController');
  // get userId
  const { userId } = req;
  // get beer ticket id
  const beerTicketId = req.params.id;

  // get data
  const getDataAndRender = async () => {
    const beerTicketData = await getBeerTicketData(beerTicketId);
    // // render
    res.status(200).render('beerTicket', {
      title: '',
      page: '',
      desc: '',
      beerTicketId,
      giverName: beerTicketData.giverName,
      receiverName: beerTicketData.receiverName,
      beerTicketData: beerTicketData.ticketData,
    });
  };
  // exeute
  getDataAndRender();
};

/* ================================================================ BEER TICKETS (REDEEM) */
export const beerTicketRedeemController = (req, res) => {
  console.log('Inside ----> beerTicketRedeemController');
  // get userId
  const { userId } = req;
  // get beer ticket id
  const beerTicketId = req.params.id;
  console.log(beerTicketId);
  // get currentDate
  const currentDate = moment().format('YYYY-MM-DD');
  // update data
  const updateDataAndRender = async () => {
    // update beer ticket data by including redeemed date and beer status
    const updateBeerTicketsTable = await pool.query(`UPDATE beer_tickets SET beer_status  = 'redeemed', beer_redeemed_date = '${currentDate}' WHERE id = ${beerTicketId} RETURNING*`);
    console.log(`Success in updating beer_tickets table ${updateBeerTicketsTable.rows}`);

    // get updated data
    const beerTicketData = await getBeerTicketData(beerTicketId);
    const giverUserId = beerTicketData.giverId;

    // update givers beer wallet to + 1
    const updateGiversBeerWallet = await pool.query(`UPDATE users SET available_beer_tickets  = available_beer_tickets + 1 WHERE id = ${giverUserId} RETURNING*`);
    console.log(`Success in updating givers wallet ${updateGiversBeerWallet.rows}`);

    // render
    res.status(200).render('beerTicketRedeem', {
      title: '',
      page: '',
      desc: '',
      beerTicketId,
      giverName: beerTicketData.giverName,
      receiverName: beerTicketData.receiverName,
      beerTicketData: beerTicketData.ticketData,
    });
  };
  // exeute
  updateDataAndRender();
};
