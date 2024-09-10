const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "Choose another email address."],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
