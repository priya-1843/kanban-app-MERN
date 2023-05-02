require('dotenv').config();
const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  try {
    const conn = mongoose.connect('mongodb+srv://champ20201994:priya12345@cluster0.kgwyrmm.mongodb.net/?retryWrites=true&w=majority');
    console.log("Database Connected successfully");
  } catch (error) {
    console.log("Database Error");
  }
};

module.exports = connectDatabase;