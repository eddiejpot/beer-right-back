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
// activate port
let PORT;
if (process.argv[2]) {
  console.log('this ran');
  PORT = process.argv[2];
} else {
  PORT = 3004;
}

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
// allow express to serve files from the uploads folder. note this is not production safe
// - the files are usaully stored on a sepearate server
app.use(express.static('uploads'));

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
