const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    firstname: {
      type: String,
      required: [true, "Please enter firstname"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter lastname"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
