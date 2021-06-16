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
import initAuthController from '../controllers/authController.mjs';

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

// Config for AWS-S3: multer upload (muilter with aws s3)
const awsS3BucketName = 'beer-right-back-01';

const multerUpload = multer({
  storage: multerS3({
    s3,
    bucket: awsS3BucketName,
    acl: 'public-read',
    metadata: (request, file, callback) => {
      callback(null, { fieldName: file.fieldname });
    },
    key: (request, file, callback) => {
      callback(null, Date.now().toString());
    },
    location: (request) => {
      request.fileUrl = request;
    },
  }),
});
/*  Config for LOCAL: multer upload (only on local)
    set the name of the upload directory a.k.a image uploads go here */
// const multerUpload = multer({ dest: 'uploads/' });

/* ============================================================ SET UP ROUTERS = */
const router = express.Router();

// initialize controller
const authController = initAuthController();

// routes
router.get('/welcome', authController.landingPage);

router.get('/login', authController.loginPage);
router.post('/login', authController.login);

router.get('/signup', authController.signUpPage);
router.post('/signup', multerUpload.single('profilePictureData'), authController.signUp);

// route for cookie
router.all('*', returnCookiesIfLoggedInMiddleware, authController.redirectToLandingPage);

/* ============================================================================ */
/* =========================================================== EXPORT ROUTER = */
/* ============================================================================ */
export default router;
