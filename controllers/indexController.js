/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
// hashing
import jsSHA from 'jssha';
// database stuff (postgres)
import pool from '../models/dbConfig.js'; 


// ' / '
export const homeController = (req, res) => {
  // res.status(200).render('homeViews/home', {
  //   title: 'TEST',
  //   page: 'home',
  //   desc: 'This is the home page where is set up a welcome page with links to other home pages',
  //   user_id: req.cookies.user_id,
  // });
  const sqlQuery = 'SELECT * FROM users';
  pool.query(sqlQuery, (dbErr, dbResult) => {
    if (dbErr) {
      console.error('Error from homeController -->', dbErr.stack);
      res.status(503).send(dbResult.rows);
      return;
    }
    // acknowledge save
    console.log(dbResult.rows);
    res.send('WORKING!');
  });
};

// ' /login '
export const loginContoller = (req, res) => {
};

// ' /register '
export const registerController = (req, res) => {
};

// ' /profile '
export const profileController = (req, res) => {
};

// ' /transactions '
export const transactionsController = (req, res) => {
};

// ' /transactions/:sort '
export const transactionsSortController = (req, res) => {
};

// ' /contacts '
export const contactsController = (req, res) => {
};

// ' /beer/buy'
export const beerBuyController = (req, res) => {
};

// ' /beer/redeem '
export const beerRedeemController = (req, res) => {
};

// ' /beer/brand-new-ticket/:id '
export const beerBrandNewTicketController = (req, res) => {
};

// ' /beer/ticket/:id '
export const beerTicketController = (req, res) => {
};
