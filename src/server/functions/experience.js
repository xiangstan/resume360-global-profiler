const { dbQuery, dbQueryValidate } = require("../utils/db");
const { DB_SCHEMA } = process.env;

const expTable = `${DB_SCHEMA}.jobs`;

const srcUserExp = `SELECT "uaid", "title", "company", "experience", "start", "end" FROM ${expTable} WHERE "uaid" = $1;`;

const expColsPri = ["uaid", "title", "start"];
const expColsOther = ["company", "experience", "end"];

/*** create a new working experience record */
const addExp = async (val) => {
  const fields = [];
  const values = [];
  const qs = [];
  let counter = 1;
  for (const [i, expCol] of expColsPri.entries()) {
    fields.push(`"${expCol}"`);
    values.push(val[expCol]);
    qs.push(`$${i + counter}`);
  }
  counter += expColsPri.length;
  for (const [i, expCol] of expColsOther.entries()) {
    if (!val[expCol]) {
      val[expCol] = null;
    }
    fields.push(`"${expCol}"`);
    values.push(val[expCol]);
    qs.push(`$${i + counter}`);
  }
  const result = await dbQuery(`INSERT INTO ${expTable} (${fields.join(", ")}) VALUES (${qs.join(", ")});`, values, 100);
  if (dbQueryValidate(result.errno, [100])) {
    result.note = 'User experience';
    result.status = 'success';
    result.exp = await fetchExp(val.uaid, 1);
  }
  return result;
}

/*** delete an existing working experience record */
const delExp = async (val) => {
  const fields = [];
  const values = [];
  let counter = 1;
  for (const [i, expCol] of expColsPri.entries()) {
    fields.push(`"${expCol}"=$${i + counter}`);
    values.push(val[expCol]);
  }
  const result = await dbQuery(`DELETE FROM ${expTable} WHERE ${fields.join(" AND ")};`, values, 102);
  if (dbQueryValidate(result.errno, [102])) {
    result.note = 'User experience';
    result.status = 'success';
    result.exp = await fetchExp(val.uaid, 1);
  }
  return result;
}

/***
 * check if a user's experiences exists in the database.
 * if yes, then retrieve all information about this user's working history.
 */
const fetchExp = async (id, errno) => {
  try {
    const result = await dbQuery(srcUserExp, [id], errno);
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
 * update user's experience data.
 * this function will call either add or delete a experience record.
 */
const updateExp = async (val) => {
  let result = {};
  const expMethods = {
    "add": async () => await addExp(val),
    "remove": async () => await delExp(val),
  };
  const method = val.value; // Get the method from the request body

  if (expMethods[method]) {
    result = await expMethods[method]();
  }
  else {
   result = {
      errno: 9996,
      req: req.body
    };
  }
  return result;
}

module.exports = {
  fetchExp,
  updateExp
}