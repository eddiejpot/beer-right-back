/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
// hashing
import jsSHA from 'jssha';
// database stuff (postgres)
import pool from '../models/dbConfig.mjs';

/* ============================================================================ */
/* ==================================================== IMPORT HELPER FUNCTIONS */
/* ============================================================================ */

import {
  getUsers,
} from '../utils/sqlQueryFunctions.mjs';

import {
  checkUserLoginDetails,
} from '../utils/authFunctions.mjs';

/* ============================================================================ */
/* ======================================================= MIDDLEWARE FUNCTIONS */
/* ============================================================================ */

/* ============================================================================ */
/* ================================================================ CONTROLLERS */
/* ============================================================================ */

export default function initAuthController() {
  const redirectToLandingPage = async (req, res, next) => {
    try {
      console.log('Inside ----> initAuthController.redirectToLandingPage');
      // if there is a userName cookie it means there is a login cookie
      if (req.isUserLoggedIn) {
        return next();
      }
      // if don't have login cookie
      console.log('Unverified user! Proceed to landing page');
      // redirect to login
      res.redirect('/welcome');
    } catch (error) {
      console.error(`!Error in redirecting to landingPage: ${error}`);
    }
  };

  const landingPage = async (req, res) => {
    try {
      console.log('Inside ----> initAuthController.landingPage');
      res.status(200).render('landingPage', {
        title: '',
        page: '',
        desc: '',
      });
    } catch (error) {
      console.error(`!Error in rendering landingPage: ${error}`);
    }
  };

  const loginPage = async (req, res) => {
    try {
      console.log('Inside ----> initAuthController.loginPage');
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
    } catch (error) {
      console.error(`!Error in rendering loginPage: ${error}`);
    }
  };

  const login = async (req, res) => {
    try {
      console.log('Inside ----> initAuthController.login');
      const { email } = req.body;
      const { password } = req.body;
      // get users
      const allUsers = await getUsers();
      // perform login check
      const loginOutcomeObj = checkUserLoginDetails(allUsers, email, password);

      // send cookies and redirect depending on login outcome
      switch (loginOutcomeObj.loginOutcome) {
        case 'EMAIL_NOT_EXIST':
          // send cookies
          res.cookie('loggedIn', false);
          // redirect
          console.log('Email does not exist! Redirecting to login page!');
          res.redirect('/login');
          break;

        case 'PASSWORD_WRONG':
          // send cookies
          res.cookie('loggedIn', false);
          // redirect
          console.log('Wrong password! Redirecting to login page!');
          res.redirect('/login');
          break;

        case 'CORRECT_LOGIN_DETAILS':
          // send cookies
          res.cookie('loggedIn', true);
          // user id cookie
          res.cookie('userId', loginOutcomeObj.userData.id);
          // userName cookie
          res.cookie('userName', loginOutcomeObj.userData.username);
          // redirect
          console.log('Correct Login Details! Redirecting to homepage!');
          res.redirect('/');
          break;

        default:
          console.log('This should not need to run');
          break;
      }
    } catch (error) {
      console.error(`!Error in logging in: ${error}`);
    }
  };

  const signUpPage = async (req, res) => {
    try {
      console.log('Inside ----> initAuthController.signUpPage');
      res.status(200).render('signUp', {
        title: '',
        page: '',
        desc: '',
      });
    } catch (error) {
      console.error(`!Error in rendering signUpPage: ${error}`);
    }
  };

  const signUp = async (req, res) => {
    try {
      console.log('Inside ----> initAuthController.signUp');
      // get user sign up details
      const { email } = req.body;
      const { password } = req.body;
      const { username } = req.body;

      // get profile picture details
      const profilePictureFileUrl = req.file.location;
      const profilePictureFileName = req.file.key;
      const profilePictureAltText = `${username}-${req.file.originalname}`;

      // HASH PASSWORD
      // initialise the SHA object
      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      // input the password from the request to the SHA object
      shaObj.update(password);
      // get the hashed password as output from the SHA object
      const hashedPassword = shaObj.getHash('HEX');

      // Store new user data into db
      const dataToInsert = [username, email, hashedPassword, profilePictureFileUrl, profilePictureFileName, profilePictureAltText, 5];
      const updateUsersTableQuery = await pool.query('INSERT INTO users (username, email, password, profile_picture_url, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', dataToInsert);
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
    } catch (error) {
      console.error(`!Error in signing up: ${error}`);
    }
  };

  return {
    redirectToLandingPage,
    landingPage,
    loginPage,
    login,
    signUpPage,
    signUp,
  };
}
