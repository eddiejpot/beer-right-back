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
 * @returns {Booleanr} isUserLoggedIn (req.isUserLoggedIn)
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
