/* ============================================================================ */
/* =========================================================== IMPORT MODULES = */
/* ============================================================================ */
// aws
import aws from 'aws-sdk';

// configure libraries
const s3 = new aws.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

// FUNCTIONS
/**
 * Check if login details are correct.
 * @param {Array} allUsersArr takes in an array of all the users
 * @param {String} inputEmail email that user tried to login with
 * @param {String}inputPassword password that user tried to login with
 * @returns {Object} the object returned has 2 keys
 * 1. A string. loginOutcome which has 3 types
 * (CORRECT_LOGIN_DETAILS, EMAIL_NOT_EXIST, PASSWORD_WRONG)
 * 2. An object containing the userData IF the login details are correct
 */

// eslint-disable-next-line import/prefer-default-export
export const getS3BucketObjects = (bucketName, req, res, next) => {
  // Create the parameters for calling listObjects
  const bucketParams = {
    Bucket: bucketName,
  };

  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, (err, data) => {
    if (err) {
      console.log('Error in obtaining a list of ojects in s3 bucket', err);
    } else {
      req.s3BucketObjects = data;
    }
  });
  next();
};
