const { createUser, findUserByUsername } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signUp = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const user = await createUser(username, password);
  res.status(201).json({ message: 'User created successfully', userId: user.id });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { signUp, login };
