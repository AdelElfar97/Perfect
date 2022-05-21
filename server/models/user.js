const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // _id: mongoose.Types.ObjectId,

  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },


  password: {
    type: String,
    required: true,
  },

  

});
module.exports = mongoose.model("user", userSchema);
