const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    require: true,
    type: String,
    unique: true,
  },

  password: {
    require: true,
    type: String,
  },

  status: {
    type: String,
    enum: ["Active", "Pending"],
    default: "Pending",
  },
 
  confirmCode: {
    type: Number,
    default: "",
  },

  avatar: {
    type: String,
    default: "",
  },
}, {
  timestamps: true
});

const users = mongoose.model("users", userSchema);
module.exports = users;
