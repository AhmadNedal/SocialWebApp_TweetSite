const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  bio :String , 
  Autor: [{ String }],
  isAdmin: Boolean  
});

module.exports = mongoose.model("User", userSchema);
