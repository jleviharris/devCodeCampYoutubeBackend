require("dotenv").config();
const connectDb = require("./startup/db");
const express = require("express");
const cors = require("cors");
// const Joi = require("joi");
const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running. Listening on PORT: ${PORT}`);
});
