const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

function createToken(user) {
  try {
    const result = jwt.sign(user, JWT_KEY, { expiresIn: "1hr" });
    return result;
  } catch (error) {
    console.log("Something went wrong in token creation");
    throw error;
  }
}

function verifyToken(token) {
  try {
    const response = jwt.verify(token, JWT_KEY);
    return response;
  } catch (error) {
    console.log("Something went wrong in token validation", error);
    throw error;
  }
}

module.exports = {
  createToken,
  verifyToken,
};
