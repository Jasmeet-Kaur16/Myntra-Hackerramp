const User = require('../models/user');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require('bcryptjs');


// Register a user
const registerUser = catchAsyncErrors(async (req, res) => {
  const {phonenumber, password } = req.body;

  const user = await User.create({
    phonenumber,
    password
  });

  sendToken(user, 200, res);
});

// Login User  =>  /api/v1/login
const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { phonenumber, password } = req.body;

  // Check if phonenumber and password entered by user
  if (!phonenumber || !password) {
    return next(new ErrorHandler("Please enter phonenumber and password", 400));
  }

  // Finding user in Database
  const user = await User.findOne({ phonenumber }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid phonenumber or Password", 401));
  }

  // Check if password is correct
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid phonenumber or Password", 401));
    }
    user.verify = "verified";
    await user.save();

  sendToken(user, 200, res);
});


// Logout User  =>  /api/v1/logout
const logout = catchAsyncErrors(async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    next(error);
  }
});


module.exports = {
    registerUser,
    userLogin,
    logout,
    
}