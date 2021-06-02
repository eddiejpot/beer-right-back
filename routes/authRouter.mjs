/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
import express from 'express';

/* ============================================================================ */
/* ======================================================= IMPORT CONTROLLERS = */
/* ============================================================================ */
import {
  authController,
  landingPageController,
  loginController,
  loginPostController,
  signUpController,
  signUpPostController,
} from '../controllers/authController.mjs';

/* ============================================================================ */
/* ======================================================= MIDDLEWARE FUNCTIONS */
/* ============================================================================ */
import {
  returnCookiesIfLoggedInMiddleware,
} from '../controllers/authFunctions.mjs';

/* ============================================================ SET UP ROUTERS = */
const router = express.Router();

// route for landing page
router.get('/welcome', landingPageController);

// routes
router.get('/login', loginController);
router.post('/login', loginPostController);

router.get('/signup', signUpController);
router.post('/signup', signUpPostController);

// routes for cookie
router.all('*', returnCookiesIfLoggedInMiddleware, authController);

/* ============================================================================ */
/* =========================================================== EXPORT ROUTER = */
/* ============================================================================ */
export default router;
