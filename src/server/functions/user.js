const { dbQuery } = require("../utils/db");

const usersTable = '"sgp"."users"';

const addSingleAccount = `INSERT INTO ${usersTable} ("email") VALUES ($1) RETURNING "uaid"`;

const selSingleAccount = `SELECT "uaid", "email" FROM ${usersTable} WHERE "email" = $1;`;

/***
 * create a new user account
 */
const addUser = async (email) => {
  try {
    const result = await dbQuery(addSingleAccount, [email], 100, "uaid");
    return result;
  }
  catch (error) {
    console.error("Error: " + error)
    return {
      errmsg: error,
      errno: -1
    }
  }
}

/***
 * check if a user exists in the database.
 * if yes, then retrieve all information about this user.
 */
const checkUser = async (email, errno) => {
  try {
    const result = await dbQuery(selSingleAccount, [email], errno);
    return result;
  }
  catch (error) {
    console.error("Error: " + error)
    return {
      errmsg: error,
      errno: -1
    }
  }
}

module.exports = {
  addUser,
  checkUser
}