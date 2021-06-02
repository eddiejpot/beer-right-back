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
  getUsers,
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

/* ============================================================================ */
/* ================================================================ CONTROLLERS */
/* ============================================================================ */

// ' / '
export const authController = (req, res, next) => {
  console.log('Inside ----> authController');
  // if there is a userName cookie it means there is a login cookie
  if (req.isUserLoggedIn) {
    return next();
  }
  // if don't have login cookie
  console.log('Unverified user! Proceed to landing page');
  // redirect to login
  res.redirect('/welcome');
};

export const landingPageController = (req, res) => {
  console.log('Inside ----> landingPageController');

  // get global exchange data
  const getDataAndRender = async () => {
    res.status(200).render('landingPage', {
      title: '',
      page: '',
      desc: '',
    });
  };
  // execute
  getDataAndRender();
};

// ' /login '
export const loginController = (req, res) => {
  console.log('Inside ----> loginController');
  let isUserLoggingInAgain = false;
  if (req.cookies.loggedIn === 'false') {
    isUserLoggingInAgain = true;
  }
  res.status(200).render('login', {
    title: '',
    page: '',
    desc: '',
    isUserLoggingInAgain,
  });
};

export const loginPostController = (req, res) => {
  console.log('Inside ----> loginPostController');
  const { email } = req.body;
  const { password } = req.body;
  const getDataAndRender = async () => {
    // get users
    let redirectPath;
    const allUsers = await getUsers();
    const allUsersLength = allUsers.length;

    // Check if email exists
    let checkIfCorrectUserEmail = false;
    const test = await allUsers.forEach((e, i) => {
      // If email exists...
      if (e.email === email) {
        console.log('logging in');

        // initialise SHA object
        const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
        // input the password from the request to the SHA object
        shaObj.update(password);
        // get the hashed value as output from the SHA object
        const hashedPassword = shaObj.getHash('HEX');
        console.log(hashedPassword);

        // check password
        if (e.password !== hashedPassword) {
          res.status(403).send('sorry wrong password!');
        }

        // send cookies
        // logged in cookie
        res.cookie('loggedIn', true);
        // user id cookie
        res.cookie('userId', e.id);
        // userName cookie
        res.cookie('userName', e.username);
        // redirect to homepage
        console.log('GOING TO REDIRECT');
        redirectPath = '/';
        console.log('redirected');
        checkIfCorrectUserEmail = true;
      }
      console.log('coming out of check');
      // If email does not exist
      if (allUsersLength === i + 1 && checkIfCorrectUserEmail === false) {
        res.cookie('loggedIn', false);
        redirectPath = '/login';
      }
    });
    res.redirect(redirectPath);
  };
  // execute
  getDataAndRender();
};

// ' /signup '
export const signUpController = (req, res) => {
  console.log('Inside ----> signUpController');
  res.status(200).render('signUp', {
    title: '',
    page: '',
    desc: '',
  });
};

export const signUpPostController = (req, res) => {
  console.log('Inside ----> signUpPostController');
  // get user sign up details
  const { email } = req.body;
  const { password } = req.body;
  const { username } = req.body;

  // initialise the SHA object
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  // input the password from the request to the SHA object
  shaObj.update(password);
  // get the hashed password as output from the SHA object
  const hashedPassword = shaObj.getHash('HEX');

  // Store new user data into db
  const updateUsersTable = async () => {
    const dataToInsert = [username, email, hashedPassword, 5];
    const updateUsersTableQuery = await pool.query('INSERT INTO users (username, email, password, available_beer_tickets) VALUES ($1, $2, $3, $4) RETURNING *', dataToInsert);
    console.log(`Success in adding user! ${updateUsersTableQuery.rows}`);

    const userId = updateUsersTableQuery.rows[0].id;

    // send cookies
    // logged in cookie
    res.cookie('loggedIn', true);
    // user id cookie
    res.cookie('userId', userId);
    // userName cookie
    res.cookie('userName', username);
    // redirect to homepage
    console.log('GOING TO REDIRECT');
    // Redirect to homepage
    res.redirect('/');
  };
  // execute
  updateUsersTable();
};
