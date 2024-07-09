const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to hash the password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Function to compare the password with the hashed password
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Function to generate a JWT
const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};