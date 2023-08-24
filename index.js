const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const config = require("./config/config");

const app = express();

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app
      .listen(config.PORT, () => {
        console.log(`Server is listening on port ${config.PORT}`);
      })
      .on("error", (err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
