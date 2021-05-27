/* ================================================= */
/* =============== IMPORT MODULES ================= */
/* ================================================ */
import pool from './dbConfig.js';


// DB Query

const poolQueries = (sqlQuery, values, callback) => {
  pool.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(`ERROR IN handleQueryCallback ---> ${err}`);
      callback(err, null);
    } else {
      console.log(`SUCCESS IN handleQueryCallback ---> ${results}`);
      console.log(results.rows);
      callback(null, results.rows);
    }
  });
};

/* ================================================= */
/* =============== EXPORT MODULES ================= */
/* ================================================ */
export default poolQueries;
