/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
// others
import moment from 'moment'; // npm install moment

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
} from '../utils/sqlQueryFunctions.mjs';

import {
  changeDateFormat,
  changeRedeemDateFormat,
} from '../utils/helperFunctions.mjs';

/* ============================================================================ */
/* ======================================================= MIDDLEWARE FUNCTIONS */
/* ============================================================================ */

/* ============================================================================ */
/* ================================================================ CONTROLLERS */
/* ============================================================================ */

export default function initIndexController() {
  const beerExchangePage = async (req, res) => {
    console.log('Inside ----> initIndexController.beerExchangePage');
    // get userId
    const { userId } = req;
    try {
      // get data needed
      const currentUserData = await getCurrentUserData(userId);
      const whoOwesUserArr = await getWhoOwesUserData(userId);
      const userOwesWhoArr = await getUserOwesWhoData(userId);

      // render page
      res.status(200).render('index', {
        userName: currentUserData.username.toUpperCase(),
        currentUserProfilePictureUrl: currentUserData.profile_picture_url,
        currentUserProfilePictureAltText: currentUserData.profile_picture_alt_text,
        beerWallet: currentUserData.available_beer_tickets,
        whoOwesUserArr,
        userOwesWhoArr,
      });
    } catch (error) {
      console.error(`!Error in rendering beerExchangePage: ${error}`);
    }
  };

  const profilePage = async (req, res) => {
    console.log('Inside ----> initIndexController.profilePage');
    // get userId
    const { userId } = req;
    try {
      // get data needed
      const currentUserData = await getCurrentUserData(userId);
      // render page
      res.status(200).render('profile', {
        userName: currentUserData.username.toUpperCase(),
        currentUserProfilePictureUrl: currentUserData.profile_picture_url,
        currentUserProfilePictureAltText: currentUserData.profile_picture_alt_text,
        beerWallet: currentUserData.available_beer_tickets,
      });
    } catch (error) {
      console.error(`!Error in rendering profilePage: ${error}`);
    }
  };

  const contactsPage = async (req, res) => {
    console.log('Inside ----> initIndexController.contactsPage');
    // get userId
    const { userId } = req;
    try {
      // get data
      const userFriendsData = await getUserFriends(userId);
      // render
      res.status(200).render('contacts', {
        title: '',
        page: '',
        desc: '',
        userFriends: userFriendsData,
      });
    } catch (error) {
      console.error(`!Error in rendering contactsPage: ${error}`);
    }
  };

  const logOut = async (req, res) => {
    console.log('Inside ----> initIndexController.logOut');
    try {
      // delete cookies
      res.clearCookie('userId');
      res.clearCookie('userName');
      res.clearCookie('loggedIn');
      // redirect to login page
      res.redirect('/login');
    } catch (error) {
      console.error(`!Error in logging out: ${error}`);
    }
  };

  const transactionsPage = async (req, res) => {
    console.log('Inside ----> initIndexController.transactionsPage');
    // get userId
    const { userId } = req;
    // get sort type
    const sortType = req.params.sort;
    try {
      // get user and beer ticket data
      const usersAndBeerTicketsData = await getUsersAndBeerTicketsData(userId);
      // split into beers user owes and beers owed to user
      const updatedBeersOwedToUserArr = usersAndBeerTicketsData.beersOwedToUser;
      const updatedBeersUserOwesArr = usersAndBeerTicketsData.beersUserOwes;
      // add in a new key beer_expiry_date_edit
      changeDateFormat(updatedBeersOwedToUserArr);
      changeDateFormat(updatedBeersUserOwesArr);

      // determine what to render depending on sort type
      let dataToRender;

      switch (sortType) {
        case 'all': {
          // edit and add parameter before sending to ejs
          updatedBeersOwedToUserArr.forEach((e) => e.type = 'oweMe');
          updatedBeersUserOwesArr.forEach((e) => e.type = 'iOwe');
          // combine arr
          dataToRender = [...updatedBeersOwedToUserArr, ...updatedBeersUserOwesArr];
          break;
        }
        case 'in':
          dataToRender = updatedBeersOwedToUserArr;
          break;
        case 'out':
          dataToRender = updatedBeersUserOwesArr;
          break;
        case 'done': {
          // get redeemed tickets data
          const usersAndBeerTicketsRedeemedData = await getUsersAndBeerTicketsRedeemedData(userId);
          // split up in who owes user and who user owes
          const redeemUserArr = usersAndBeerTicketsRedeemedData.beersOwedToUser;
          const redeemFriendsArr = usersAndBeerTicketsRedeemedData.beersUserOwes;

          // add in a new key beer_redeemed_date_edit
          changeRedeemDateFormat(usersAndBeerTicketsRedeemedData.beersOwedToUser);
          changeRedeemDateFormat(usersAndBeerTicketsRedeemedData.beersUserOwes);

          // edit and add parameter before sending to ejs
          redeemUserArr.forEach((e) => { e.type = 'redeemedByUser'; });
          redeemFriendsArr.forEach((e) => { e.type = 'redeemedByFriend'; });

          // combine arr
          dataToRender = [...redeemUserArr, ...redeemFriendsArr];
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
        beersData: dataToRender,
        sortType,
      });
    } catch (error) {
      console.error(`!Error in rendering transactionsPage: ${error}`);
    }
  };

  const beerCreateForm = async (req, res) => {
    console.log('Inside ----> initIndexController.beerCreateForm');
    // get userId
    const { userId } = req;
    try {
      // get data
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
    } catch (error) {
      console.error(`!Error in rendering beerCreateForm: ${error}`);
    }
  };

  const beerCreate = async (req, res) => {
    console.log('Inside ----> initIndexController.beerCreate');
    // get userId
    const { userId } = req;
    // get form data
    const formData = req.body;
    // get friend Id
    const friendId = Number(formData.friendId);
    // get date (one-month from now)
    const dateOneMonthFromNow = moment().add(1, 'months').format('YYYY-MM-DD');
    // reformat date for viewing in eja
    const dateOneMonthFromNowEdit = moment().add(1, 'months').format('DD-MM-YYYY');

    try {
      // update beer_tickets table
      let beerTicketId = '';

      const dataToInsert = [userId, friendId, 'available', dateOneMonthFromNow];
      const updateBeerTicketsTable = await pool.query('INSERT INTO beer_tickets (giver_id, receiver_id, beer_status, beer_expiry_date) VALUES ($1, $2, $3, $4) RETURNING*', dataToInsert);
      console.log(`Success in adding to beer_tickets! ${updateBeerTicketsTable.rows}`);
      beerTicketId = updateBeerTicketsTable.rows[0].id;

      const updateBeerWallet = await pool.query(`UPDATE users SET available_beer_tickets  = available_beer_tickets - 1 WHERE id = ${userId} RETURNING*`);
      console.log(`Success in editng user.available_beer_tickets! ${updateBeerWallet.rows}`);

      const beerTicketData = await getBeerTicketData(beerTicketId);

      // render
      res.status(200).render('brandNewBeerTicket', {
        title: '',
        page: '',
        desc: '',
        beerTicketId,
        giverName: beerTicketData.giverName,
        receiverName: beerTicketData.receiverName,
        beerTicketData: beerTicketData.ticketData,
        beerTicketExpiry: dateOneMonthFromNowEdit,
      });
    } catch (error) {
      console.error(`!Error in creating beer in beerCreate: ${error}`);
    }
  };

  const beerRedeemPage = async (req, res) => {
    console.log('Inside ----> initIndexController.beerRedeemPage');
    // get userId
    const { userId } = req;
    try {
      // get data needed
      const usersAndBeerTicketsData = await getUsersAndBeerTicketsData(userId);
      // get those that owe current user
      const peopleWhoOweUser = usersAndBeerTicketsData.beersOwedToUser;

      // add in a new key beer_expiry_date_edit
      changeDateFormat(peopleWhoOweUser);

      // render page
      res.status(200).render('beerRedeem', {
        title: '',
        page: '',
        desc: '',
        peopleWhoOweUserArr: peopleWhoOweUser,
      });
    } catch (error) {
      console.error(`!Error rendering beerRedeemPage: ${error}`);
    }
  };

  const newBeerTicketPage = async (req, res) => {
    console.log('Inside ----> initIndexController.newBeerTicketPage');
    try {
      // render page
      res.status(200).render('brandNewBeerTicket', {
        title: '',
        page: '',
        desc: '',
        // user_id: req.cookies.user_id,
      });
    } catch (error) {
      console.error(`!Error rendering newBeerTicketPage: ${error}`);
    }
  };

  const beerTicketPage = async (req, res) => {
    console.log('Inside ----> initIndexController.beerTicketPage');
    // get beer ticket id
    const beerTicketId = req.params.id;
    try {
      // get data
      const beerTicketData = await getBeerTicketData(beerTicketId);

      // add in a new key beer_expiry_date_edit
      changeDateFormat([beerTicketData.ticketData]);

      // render
      res.status(200).render('beerTicket', {
        title: '',
        page: '',
        desc: '',
        beerTicketId,
        giverName: beerTicketData.giverName,
        receiverName: beerTicketData.receiverName,
        beerTicketData: beerTicketData.ticketData,
      });
    } catch (error) {
      console.error(`!Error rendering beerTicketPage: ${error}`);
    }
  };

  const redeemedBeerTicketPage = async (req, res) => {
    console.log('Inside ----> initIndexController.beerRedeemPage');
    // get userId
    const { userId } = req;
    // get beer ticket id
    const beerTicketId = req.params.id;
    // get currentDate for display
    const currentDate = moment().format('YYYY-MM-DD');
    // get currentDate to put in table
    const beerTicketRedeemedDateDisplay = moment().format('DD-MM-YYYY');

    try {
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
        beerTicketRedeemedDateDisplay,
      });
    } catch (error) {
      console.error(`!Error rendering beerRedeemPage: ${error}`);
    }
  };

  return {
    beerExchangePage,
    profilePage,
    contactsPage,
    logOut,
    transactionsPage,
    beerCreateForm,
    beerCreate,
    beerRedeemPage,
    newBeerTicketPage,
    beerTicketPage,
    redeemedBeerTicketPage,
  };
}
