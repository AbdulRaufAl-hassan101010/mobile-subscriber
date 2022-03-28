const mongoose = require("mongoose");
const { isEmail } = require("validator");

const ownerSchema = new mongoose.Schema({
  _id: Number,
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!isEmail(value.toLowerCase()))
        throw { code: 400, message: "Please Enter a valid Email" };
    },
  },
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
