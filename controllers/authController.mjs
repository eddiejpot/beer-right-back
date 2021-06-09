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
  res.status(200).render('landingPage', {
    title: '',
    page: '',
    desc: '',
  });
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

export const loginPostController = async (req, res) => {
  console.log('Inside ----> loginPostController');
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

export const signUpPostController = async (req, res) => {
  console.log('Inside ----> signUpPostController');
  // get user sign up details
  const { email } = req.body;
  const { password } = req.body;
  const { username } = req.body;
  const { s3BucketObjects } = req;

  const profilePictureFileName = req.file.filename;
  const profilePictureAltText = `${username}-${req.file.originalname}`;

  console.log('FORM DATA!');
  console.log(`EMAIL : ${email} `);
  console.log(`PW : ${password} `);
  console.log(`USERNAME : ${username} `);
  console.log(`FILENAME : ${profilePictureFileName} `);

  console.log('BUCKET STUFF');
  console.log(s3BucketObjects);
  console.log('SEE WHAT IS IN OWENER KEY');
  console.log(s3BucketObjects[0].Owner);

  // // initialise the SHA object
  // const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  // // input the password from the request to the SHA object
  // shaObj.update(password);
  // // get the hashed password as output from the SHA object
  // const hashedPassword = shaObj.getHash('HEX');

  // // Store new user data into db
  // const dataToInsert = [username, email, hashedPassword, profilePictureFileName, profilePictureAltText, 5];
  // const updateUsersTableQuery = await pool.query('INSERT INTO users (username, email, password, profile_picture_hashed_name, profile_picture_alt_text, available_beer_tickets) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', dataToInsert);
  // console.log(`Success in adding user! ${updateUsersTableQuery.rows}`);

  // const userId = updateUsersTableQuery.rows[0].id;

  // // send cookies
  // // logged in cookie
  // res.cookie('loggedIn', true);
  // // user id cookie
  // res.cookie('userId', userId);
  // // userName cookie
  // res.cookie('userName', username);
  // // redirect to homepage
  // console.log('GOING TO REDIRECT');
  // // Redirect to homepage
  // res.redirect('/');
};
