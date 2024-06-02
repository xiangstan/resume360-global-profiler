const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { PYTHON_EXEC, PYTHON_DIR } = process.env;

/***
 * Invoke the python script to summarize the resume and
 * return an abstract
 */
const getAbstract = async (val) => {
  try {
    const { stdout, stderr } = await exec(`${PYTHON_EXEC} ${PYTHON_DIR}/main.py ${val.uaid.toString()}`);
    console.log(`stdout: ${stdout}`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    return {
      errno: -1,
      errmsg: stdout.trim(),
      status: 'success'
    }

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
  getAbstract
}