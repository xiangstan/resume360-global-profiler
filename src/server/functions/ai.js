const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { DB_NAME, DB_USER, DB_PASSWD, DB_HOST, PYTHON_EXEC, PYTHON_DIR } = process.env;

// The resume prompt to be used in abstract generation
const prompt = "Please summarize the resume of this person's skill without its personal information and reward. List basic skills only, no detail for work experiences. No sentences ,just several key words.\n";

/***
 * Invoke the python script to summarize the resume and
 * return an abstract
 * model_name => the model to be used, refer to gpt4all doc
 * resume => the content of the user resume
 */
// const getAbstract = async (model_name, prompt, resume) => {
const getAbstract = async (val) => {
  try {
    const { stdout, stderr } = await exec(`${PYTHON_EXEC} ${PYTHON_DIR}/main.py ${DB_USER} "${DB_PASSWD}" ${DB_HOST} ${DB_NAME} ${val.uaid.toString()}`);
    // const { stdout, stderr } = await exec(`/home/xtan/anaconda3/bin/python ./gpt4all.py ${model_name} ${prompt} "${resume}"`);
    // const { stdout, stderr } = await exec('/home/xtan/anaconda3/bin/python ./file.py3');
    return {
      errno: -1,
      errmsg: stdout.trim()
    }

    // console.log(`stdout: ${stdout}`);
    // if (stderr) {
    //   console.error(`stderr: ${stderr}`);
    // }
    // console.log("Am I waiting for the 5 second?")
  }
  catch (error) {
    console.error("Error: " + error)
    return {
      errmsg: error,
      errno: -1
    }
  }
}

let result = "Original Value";
console.log(result)
getAbstract('nous-hermes-llama2-13b.Q4_0.gguf', prompt);

module.exports = {
  getAbstract
}