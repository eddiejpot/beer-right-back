/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */

// express / server stuff
import express from 'express';
import methodOverride from 'method-override'; // npm install method-override

// cookies
import cookieParser from 'cookie-parser'; // npm install cookie-parser

/* ============================================================================ */
/* =========================================================== IMPORT ROUTERS = */
/* ============================================================================ */
import indexRouter from './routes/indexRouter.mjs';
import authRouter from './routes/authRouter.mjs';

/* ============================================================================ */
/* ============================================================== INIT SERVER = */
/* ============================================================================ */

// Initialise Express
const app = express();
const PORT = 3004; // change this to process.argv[2] when ready

// Override POST requests with query param ?_method=PUT to be PUT requests
app.use(methodOverride('_method'));

/* The code below allows us to listen for post requests
  *read more about it below
  *https://bootcamp.rocketacademy.co/3-backend-applications/3.1-express-js/3.1.3-handling-post-requests#receive-post-requests-in-express
*/
app.use(express.urlencoded({ extended: false }));

// EJS Set Up
app.set('view engine', 'ejs');
// allow access to public directory
app.use(express.static('public'));

/* ============================================================================ */
/* ============================================================= COOKIES SET UP */
/* ============================================================================ */
app.use(cookieParser());

/* ================================================================ MAIN ROUTES */
app.all('*', authRouter);
app.use('/', indexRouter);

/* ============================================================================ */
/* ===================================================================== LISTEN */
/* ============================================================================ */
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
