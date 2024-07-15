const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    phonenumber: {
      type: Number,
      unique: true,
      require: [true, "Error: Enter Phone Number Above"],
    },
    verify: {
      type: String,
      required: true,
      default: "unverified",
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please enter valid Email ID "],
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    searchHistory: [
      {
        items: {
          type: String,
        },
      },
    ],
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    address: {
      pincode: {
        type: Number,
      },

      address: {
        type: String,
      },
      citystate: {
        type: String,
      },
    },
    TOA: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "2d",
  });
};
module.exports = mongoose.model("users", userSchema);
