const { dbQuery, dbQueryValidate } = require("../utils/db");
const { DB_SCHEMA } = process.env;

const usersTable = `"${DB_SCHEMA}"."users"`;

const addSingleAccount = `INSERT INTO ${usersTable} ("email") VALUES ($1) RETURNING "uaid"`;

const selSingleAccount = `SELECT "uaid", "email", "name", "published" FROM ${usersTable} WHERE "email" = $1;`;

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
const fetchUser = async (email, errno) => {
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

/***
 * update user's selected property
 */
const updateUser = async (val) => {
  try {
    const result = await dbQuery(`UPDATE ${usersTable} SET ${val.method}=$1 WHERE "uaid"=$2`, [val.value, val.uaid], 101);
    if (dbQueryValidate(result.errno, [101])) {
      result.note = 'User profile';
      result.status = 'success';
      result.profile = await fetchUser(val.email, 1);
    }
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
  fetchUser,
  updateUser
}