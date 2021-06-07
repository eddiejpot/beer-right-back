/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
import express from 'express';

/* ============================================================================ */
/* ======================================================= IMPORT CONTROLLERS = */
/* ============================================================================ */
import {
  userDashboardController,
  profileController,
  transactionsSortController,
  contactsController,
  beerBuyController,
  beerBuyPostController,
  beerRedeemController,
  beerBrandNewTicketController,
  beerTicketController,
  beerTicketRedeemController,
} from '../controllers/indexController.mjs';

/* ============================================================================ */
/* ======================================================= MIDDLEWARE FUNCTIONS */
/* ============================================================================ */
import {
  returnCookiesIfLoggedInMiddleware,
} from '../utils/authFunctions.mjs';

/* ============================================================ SET UP ROUTERS = */
const router = express.Router();

// cookies

// routes
router.get('/', returnCookiesIfLoggedInMiddleware, userDashboardController);

router.get('/profile', profileController);

// router.get('/transactions', transactionsController);
router.get('/transactions/:sort', transactionsSortController);

router.get('/contacts', contactsController);

router.get('/beer/buy', beerBuyController);
router.post('/beer/buy', beerBuyPostController);

router.get('/beer/redeem', beerRedeemController);

router.get('/beer/brand-new-ticket/:id', beerBrandNewTicketController);

router.get('/beer/ticket/:id', beerTicketController);

router.get('/beer/ticket/redeem=true/:id', beerTicketRedeemController);

/* ============================================================================ */
/* =========================================================== EXPORT ROUTER = */
/* ============================================================================ */
export default router;
