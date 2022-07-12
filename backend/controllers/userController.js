const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

//register
//post
//@desc register user
const register = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  if (!name && !username && !password) {
    res.status(400);
    throw new Error("please enter all fields");
  }

  //check if user exist
  const userExist = await User.findOne({ username });
  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    username,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("user not created try again");
  }
});
//register
//post
//@desc login user
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("wrong user name or password");
  }
});
//register
//post
//@desc register user
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, username } = req.user;

  res.status(200).json({
    id: _id,
    name,
    username,
  });
});

module.exports = { register, login, getUser };
