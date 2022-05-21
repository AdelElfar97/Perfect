const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  // _id: mongoose.Types.ObjectId,


  name: {
    type: String,
    required: true,
    trim: true,
  },

  age: {
    type: Number,
    required: true,
  },

  

});
module.exports = mongoose.model("student", studentSchema);
