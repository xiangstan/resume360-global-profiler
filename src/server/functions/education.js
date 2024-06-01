const { dbQuery, dbQueryValidate } = require("../utils/db");
const { DB_SCHEMA } = process.env;

const eduTable = `${DB_SCHEMA}.education`;

const srcUserEdu = `SELECT "uaid", "degree", "school", "achievement", "start", "end" FROM ${eduTable} WHERE "uaid" = $1 ORDER BY "end" NULLS FIRST;`;

const eduColsPri = ["uaid", "degree", "start"];
const eduColsOther = ["school", "achievement", "end"];

/*** create a new education record */
const addEdu = async (val) => {
  const fields = [];
  const values = [];
  const qs = [];
  let counter = 1;
  for (const [i, eduCol] of eduColsPri.entries()) {
    fields.push(`"${eduCol}"`);
    values.push(val[eduCol]);
    qs.push(`$${i + counter}`);
  }
  counter += eduColsPri.length;
  for (const [i, eduCol] of eduColsOther.entries()) {
    if (!val[eduCol]) {
      val[eduCol] = null;
    }
    fields.push(`"${eduCol}"`);
    values.push(val[eduCol]);
    qs.push(`$${i + counter}`);
  }
  const result = await dbQuery(`INSERT INTO ${eduTable} (${fields.join(", ")}) VALUES (${qs.join(", ")});`, values, 100);
  if (dbQueryValidate(result.errno, [100])) {
    result.note = 'User education';
    result.status = 'success';
    result.edu = await fetchEdu(val.uaid, 1);
  }
  return result;
}
/*** delete an existing working experience record */
const delEdu = async (val) => {
  const fields = [];
  const values = [];
  let counter = 1;
  for (const [i, eduCol] of eduColsPri.entries()) {
    fields.push(`"${eduCol}"=$${i + counter}`);
    values.push(val[eduCol]);
  }
  const result = await dbQuery(`DELETE FROM ${eduTable} WHERE ${fields.join(" AND ")};`, values, 102);
  if (dbQueryValidate(result.errno, [102])) {
    result.note = 'User education';
    result.status = 'success';
    result.edu = await fetchEdu(val.uaid, 1);
  }
  return result;
}
/***
 * check if a user's education exists in the database.
 * if yes, then retrieve all information about this user's acadmic background.
 */
const fetchEdu = async (id, errno) => {
  try {
    const result = await dbQuery(srcUserEdu, [id], errno);
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
 * update user's education record.
 * this function will call either add or delete an education record.
 */
const updateEdu = async (val) => {
  let result = {};
  const eduMethods = {
    "add": async () => await addEdu(val),
    "remove": async () => await delEdu(val),
  };
  const method = val.value; // Get the method from the request body

  if (eduMethods[method]) {
    result = await eduMethods[method]();
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
  fetchEdu,
  updateEdu
}