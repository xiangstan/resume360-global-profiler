import axios from "axios"

const getErrCode = (errno, note = "unknown") => {
  const message = {
    2:   "Credential is incorrect or permission denied",
    3:   "You do not have the permission to " + note,
    8:   "Form fields cannot be empty or invalid",
    9:   "Database does not contains some of the fileds",
    11:  "You have already " + note,
    13:  "Please " + note + " first before you proceed this action",
    24:  "Logged " + note + " successfully",
    100: "New " + note + " has been added",
    101: note + " has been updated",
    102: note + " has been deleted",
    103: note + " is invalid",
    104: "You have confirm to " + note,
    105: "You have declined to " + note,
    106: "You have set the status of " + note,
    107: "Nothing has changed",
    109: "You have agreed to " + note,
    9995:note + " function is currently disabled by the system administrator",
    9996:"This function you are looking for is under-construction or invalid",
    9997:"Oops, something went wrong",
    9998:"Exception: Unknown System API name",
    9999:"Exception: Unknown function name",
  };
  if (message[errno]) {
    return message[errno] + ".";
  }
  else {
    return message[9996];
  }
}

// generate error message from error code
export function ajaxGenErrCode(err) {
  let msg = "";
  if (err.errno > 0) {
    msg = getErrCode(err.errno, err.note);
  }
  else if (err.errno == -1) {
    msg = err.errmsg + ".";
  }
  else {
    msg = getErrCode(1, "");
  }
  return msg;
}

export function ajaxErrShow(err) {
  if (typeof err.status === "undefined") {
    err.status = "danger";
  }
  return {
    message: ajaxGenErrCode(err),
    status: err.status
  }
}

// axios ajax call
export async function ajaxCall(val) {
  try {
    if (typeof axios === "undefined") {
      throw new Error("Axios not found!!");
    }
    const token = sessionStorage.getItem("sgpToken");
    const bear = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`/api/v1/${val.url}`, val.data, bear);

    if (response.status >= 400) {
      throw new Error(response.statusText);
    }
    let responseData = ajaxCleanse(response.data);
    if (responseData === null) {
      responseData = {
        errmsg: "Nothing returned from the server",
        errno: -1
      };
      console.warn(responseData);
    }
    return responseData;
  } catch (error) {
    console.error("Error occurred during API call:", error.message);
    throw error; // Re-throw the error to let the caller handle it
  }
}

/***
 * convert json from string format to object
 */
export function ajaxCleanse(val) {
  if (typeof val === "string") {
    val = JSON.parse(val)
  }
  return val;
}
/***
 * compare returning error code with specified codes array
 */
export function ajaxCompare(errno, code) {
  let flag = false;
  for (let i = 0; i < code.length; i++) {
    if (errno === code[i]) {
      flag = true;
      break;
    }
  }
  return flag;
}