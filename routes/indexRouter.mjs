/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
import express from 'express';

/* ============================================================================ */
/* ======================================================= IMPORT CONTROLLERS = */
/* ============================================================================ */
import initIndexController from '../controllers/indexController.mjs';

/* ============================================================================ */
/* ======================================================= MIDDLEWARE FUNCTIONS */
/* ============================================================================ */
import {
  returnCookiesIfLoggedInMiddleware,
} from '../utils/authFunctions.mjs';

/* ============================================================ SET UP ROUTERS = */
const router = express.Router();

// initialize controller
const indexController = initIndexController();

// routes
router.get('/', returnCookiesIfLoggedInMiddleware, indexController.beerExchangePage);

router.get('/profile', indexController.profilePage);

router.get('/contacts', indexController.contactsPage);

router.get('/logout', indexController.logOut);

router.get('/transactions/:sort', indexController.transactionsPage);

router.get('/beer/buy', indexController.beerCreateForm);
router.post('/beer/buy', indexController.beerCreate);

router.get('/beer/redeem', indexController.beerRedeemPage);

router.get('/beer/brand-new-ticket/:id', indexController.newBeerTicketPage);

router.get('/beer/ticket/:id', indexController.beerTicketPage);

router.get('/beer/ticket/redeem=true/:id', indexController.redeemedBeerTicketPage);

/* ============================================================================ */
/* =========================================================== EXPORT ROUTER = */
/* ============================================================================ */
export default router;
