/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
// others
import moment from 'moment'; // npm install moment
// hashing
import jsSHA from 'jssha';
// database stuff (postgres)
import pool from '../models/dbConfig.mjs';

// FUNCTIONS

/**
 * Check if user is logged in
 * @returns {Boolean} isUserLoggedIn (req.isUserLoggedIn)
 */
export const returnCookiesIfLoggedInMiddleware = (req, res, next) => {
  console.log('Inside ----> checkIfLoggedInMiddleware');
  req.isUserLoggedIn = false;
  if (req.cookies.loggedIn) {
    req.userId = req.cookies.userId;
    req.userName = req.cookies.userName;
    req.isUserLoggedIn = true;
  }
  next();
};

/**
 * Get cookie data
 * @returns username (req.userName) & userId (req.userId)
 */
export const getUserNameAndIdCookieMiddleware = (req, res, next) => {
  req.userName = req.cookies.userName;
  req.userId = req.cookies.userId;
  next();
};

/**
 * Check if login details are correct.
 * @param {Array} allUsersArr takes in an array of all the users
 * @param {String} inputEmail email that user tried to login with
 * @param {String}inputPassword password that user tried to login with
 * @returns {Object} the object returned has 2 keys
 * 1. A string. loginOutcome which has 3 types
 * (CORRECT_LOGIN_DETAILS, EMAIL_NOT_EXIST, PASSWORD_WRONG)
 * 2. An object containing the userData IF the login details are correct
 */
export const checkUserLoginDetails = (allUsersArr, inputEmail, inputPassword) => {
  // declare login outcomes
  const CORRECT_LOGIN_DETAILS = 'CORRECT_LOGIN_DETAILS';
  const EMAIL_NOT_EXIST = 'EMAIL_NOT_EXIST';
  const PASSWORD_WRONG = 'PASSWORD_WRONG';

  // delare output
  const output = {
    // set default loginOutcome to email does not exist
    loginOutcome: EMAIL_NOT_EXIST,
    userData: '',
  };

  // get length of arr
  const allUsersLength = allUsersArr.length;

  // perform check on email and password
  // Note: Using for loop and NOT for each because i need to exit the loop once a condition is met
  for (let i = 0; i < allUsersLength; i += 1) {
    const userDetail = allUsersArr[i];
    if (userDetail.email === inputEmail) {
      // email exists
      // proceed to check hashed password
      // initialise the SHA object
      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      // input the password from the request to the SHA object
      shaObj.update(inputPassword);
      // get the hashed value as output from the SHA object
      const hashedPassword = shaObj.getHash('HEX');

      // if wrong password
      if (userDetail.password !== hashedPassword) {
        output.loginOutcome = PASSWORD_WRONG;
        break;
      }

      // correct password
      output.loginOutcome = CORRECT_LOGIN_DETAILS;
      output.userData = userDetail;
    }
  }

  // export login outcome
  return output;
};
