const express = require("express");
const bodyParser = require("body-parser");
const routers = require("./scr/routers/userRouter");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./scr/conf/db/mongoose");
//connect to db
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routers);

app.listen(3000, function () {
  console.log("Node server running @ http://localhost:3000");
});
//db.connect();
db.connect();

module.exports = app;
