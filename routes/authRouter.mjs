/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
import express from 'express';

// multer
import multer from 'multer'; // npm install multer
// multer + aws
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

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
} from '../utils/authFunctions.mjs';

// configure libraries
const s3 = new aws.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

// congifure multer upload (muilter with aws s3)
const multerUpload = multer({
  storage: multerS3({
    s3,
    bucket: 'beer-right-back-01',
    acl: 'public-read',
    metadata: (request, file, callback) => {
      callback(null, { fieldName: file.fieldname });
    },
    key: (request, file, callback) => {
      callback(null, Date.now().toString());
    },
  }),
});

// congifure multer upload (only on local)
// set the name of the upload directory a.k.a image uploads go here
// const multerUpload = multer({ dest: 'uploads/' });

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
