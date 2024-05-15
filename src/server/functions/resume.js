const { dbQuery } = require("../utils/db");
const { DB_SCHEMA } = process.env;

const expTable = `"${DB_SCHEMA}"."jobs"`;
const eduTable = `"${DB_SCHEMA}"."education"`;

const srcUserExp = `SELECT "uaid", "title", "company", "experience", "start", "end" FROM ${expTable} WHERE "uaid" = $1;`;
const srcUserEdu = `SELECT "uaid", "degree", "school", "achievement", "start", "end" FROM ${eduTable} WHERE "uaid" = $1;`;

/***
 * check if a user's experiences exists in the database.
 * if yes, then retrieve all information about this user's working history.
 */
const fetchExp = async (email, errno) => {
  try {
    const result = await dbQuery(srcUserExp, [email], errno);
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
 * check if a user's education exists in the database.
 * if yes, then retrieve all information about this user's acadmic background.
 */
const fetchEdu = async (email, errno) => {
  try {
    const result = await dbQuery(srcUserEdu, [email], errno);
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
  fetchEdu,
  fetchExp,
}