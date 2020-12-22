const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    min : 6, 
    max : 255,
  },
  password: {
    type: String,
    required: true,
    max : 1024,
    min : 6
  },
  date : {
    type : Date,
    default : Date.now
  }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
