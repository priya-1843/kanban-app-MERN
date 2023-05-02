const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv").config();
const MongoDB = require("./src/config/MongoDB");

MongoDB();
const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", require("./src/v1/routes"));

const PORT = process.env.PORT || 1000 ;

app.listen(5000, console.log(`server running port ${PORT}...`));
