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
 * adds in a new key beer_expiry_date_edit (the expiry date in a nicer format)
 * @param {Array} userArray in array of users
 * @returns edited array
 */
export const changeDateFormat = (userArray) => {
  userArray.forEach((e) => e.beer_expiry_date_edit = moment(e.beer_expiry_date).fromNow());
  return userArray;
};

/**
 * adds in a new key beer_redeemed_date_edit (the redeemed date in a nicer format)
 * @param {Array} userArray in array of users
 * @returns edited array
 */
export const changeRedeemDateFormat = (userArray) => {
  userArray.forEach((e) => e.beer_redeemed_date_edit = moment(e.beer_redeemed_date).format('MMMM Do YYYY, h:mm:ss a'));
  return userArray;
};
