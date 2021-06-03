/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
import express from 'express';

// multer + set up
import multer from 'multer'; // npm install multer

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

// set the name of the upload directory a.k.a image uploads go here
const multerUpload = multer({ dest: 'uploads/' });

/* ============================================================ SET UP ROUTERS = */
const router = express.Router();

// route for landing page
router.get('/welcome', landingPageController);

// routes
router.get('/login', loginController);
router.post('/login', loginPostController);

router.get('/signup', signUpController);
router.post('/signup', multerUpload.single('profilePictureData'), signUpPostController);

// routes for cookie
router.all('*', returnCookiesIfLoggedInMiddleware, authController);

/* ============================================================================ */
/* =========================================================== EXPORT ROUTER = */
/* ============================================================================ */
export default router;
