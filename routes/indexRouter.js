/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */  
import express from 'express';

/* ============================================================================ */
/* ======================================================= IMPORT CONTROLLERS = */
/* ============================================================================ */  
import {
  homeController,
  loginContoller,
  registerController,
  profileController,
  transactionsController,
  transactionsSortController,
  contactsController,
  beerBuyController,
  beerRedeemController,
  beerBrandNewTicketController,
  beerTicketController,
} from '../controllers/indexController.js';

/* ============================================================ SET UP ROUTERS = */
const router = express.Router();

router.get('/', homeController);

router.get('/login', loginContoller);

router.get('/register', registerController);

router.get('/profile', profileController)

router.get('/transactions', transactionsController)
router.get('/transactions/:sort', transactionsSortController)

router.get('/contacts', contactsController);

router.get('/beer/buy', beerBuyController);
router.get('/beer/redeem', beerRedeemController);

router.get('/beer/brand-new-ticket/:id', beerBrandNewTicketController);
router.get('/beer/ticket/:id', beerTicketController);

/* ============================================================================ */
/* =========================================================== EXPORT ROUTER = */
/* ============================================================================ */  
export default router;
