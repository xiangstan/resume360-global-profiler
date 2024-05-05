const { Pool } = require("pg");

// retrieve environment variables for database configuration
const { DB_NAME, DB_USER, DB_PASSWD, DB_HOST, DB_PORT } = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWD,
  port: DB_PORT
});

/***
 * query builder
 */
async function dbQuery(query, params = [], errno, key = "") {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    // check if the query is not a SELECT statement.
    if (result.command === "INSERT") {
      console.log(result)
      const lastInsertedId = result.rows[0]?.[key];
      return {
        insertedId: lastInsertedId,
        errmsg: `Successfully inserted with ID: ${lastInsertedId}`,
        errno: errno
      }
    }
    else if (result.command === "UPDATE" || result.command === "DELETE") {
      // Return the number of affected rows
      return {
        affectedRows: result.rowCount,
        errmsg: result.rowCount > 0 ? 'Operation successful' : 'No matching records found',
        errno: errno
      };
    }
    return {
      count: result.rows.length,
      errmsg: result.rows,
      errno: errno
    }
  }
  catch (error) {
    return {
      errmsg: `Database error: ${error}`,
      errno: -1,
    }
  }
  finally {
    client.release();
  }
}

const dbQueryValidate = (errno, code) => {
  let flag = false;
  for (let i = 0; i < code.length; i++) {
    if (errno === code[i]) {
      flag = true;
      break;
    }
  }
  return flag;
}

module.exports = {
  dbQuery,
  dbQueryValidate
};