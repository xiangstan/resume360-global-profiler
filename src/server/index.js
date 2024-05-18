const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config()

const resumeRoutes = require("./routes/resume.js");
const userRoutes = require("./routes/user.js");
const port = process.env.BACKEND_PORT || 8100;

app.use(morgan("tiny"));
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Space! 🚀");
});

/***
 * user api
 */
app.use("/api/v1/user", userRoutes);
/***
 * resume api
 */
app.use("/api/v1/resume", resumeRoutes);
/**
 *  Send "Not found" for all other routes
 */
app.use((req, res, next) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});