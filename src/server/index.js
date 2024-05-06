const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.BACKEND_PORT || 8100;

require("dotenv").config()

const userRoutes = require("./routes/user.js");

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

/**
 *  Send "Not found" for all other routes
 */
app.use((req, res, next) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});