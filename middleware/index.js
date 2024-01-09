const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.TOKEN_KEY);
    }
    return null;
  } catch (error) {
    return null;
  }
};

module.exports = getUser;