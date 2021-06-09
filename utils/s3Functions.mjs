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

// eslint-disable-next-line import/prefer-default-export
export const getS3BucketObjects = (bucketName) => (req, res, next) => {
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
      console.log('IN THE S3 FUNCTION !!!!!!!!!!!!!!!');
      console.log(data);
    }
  });
  next();
};

// // eslint-disable-next-line import/prefer-default-export
// export const getS3BucketObjects = (bucketName, req, res, next) => {
//   // Create the parameters for calling listObjects
//   const bucketParams = {
//     Bucket: bucketName,
//   };

//   // Call S3 to obtain a list of the objects in the bucket
//   s3.listObjects(bucketParams, (err, data) => {
//     if (err) {
//       console.log('Error in obtaining a list of ojects in s3 bucket', err);
//     } else {
//       req.s3BucketObjects = data;
//     }
//   });
//   next();
// };
