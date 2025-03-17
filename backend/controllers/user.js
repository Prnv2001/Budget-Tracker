const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

genToken = (user) => {
  return jwt.sign(
    {
      iss: "Expense Tracker",
      sub: user.username,
      name: user.name,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    "veryverysecretkey"
  );
};

exports.register = async function (req, res, next) {
  const { name, username, password, confirmpassword } = req.body;

  //Check If User Exists
  let foundUser = await User.findOne({ username });
  if (foundUser) {
    return res.status(403).json({ error: "Username is already in use" });
  }

  if (password !== confirmpassword) {
    return res.status(403).json({ error: "Passwords do not match" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, username, password: hashedPassword });
  await newUser.save(); // Generate JWT token
  const token = genToken(newUser);
  res.status(200).json({ token, name: newUser.name,expiresIn: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString() } );
};

exports.login = async function (req, res, next) {
  const { username, password } = req.body;

  // Check if the user exists
  let foundUser = await User.findOne({ username });
  if (!foundUser) {
    return res.status(403).json({ error: "Invalid username or password" });
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) {
    return res.status(403).json({ error: "Invalid username or password" });
  }

  // Generate JWT token
  const token = genToken(foundUser);
  res.status(200).json({ token, name: foundUser.name, expiresIn: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString() });
};
