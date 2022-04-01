const mongoose = require("mongoose");
const { isEmail } = require("validator");
const SubscriberPhone = require("./SubscriberPhone");

const userSchema = new mongoose.Schema({
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
  owner: {
    type: Number,
    required: true,
    default: 1,
    ref: "Owner",
  },
});

userSchema.virtual("phone", {
  ref: "Subscriber_Phone",
  localField: "_id",
  foreignField: "customer_id_user",
});

// delete related user phone from the subscriber phone table when user is deleted
userSchema.pre("remove", async function (next) {
  const user = this;

  await SubscriberPhone.deleteOne({
    customer_id_user: user._id,
  });

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
