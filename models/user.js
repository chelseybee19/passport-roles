const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  name: String,
  password: String,
  role: {
    type: String,
    enum: ["BOSS", "DEV", "TA"],
    default: "GUEST"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
