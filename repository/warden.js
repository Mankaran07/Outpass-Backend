const Warden = require("../models/Warden");

async function findWarden(user) {
  try {
    const data = await Warden.findOne(user);
    return data;
  } catch (error) {
    console.log("Something went wrong while searching Warden!!");
    throw error;
  }
}

module.exports = {
  findWarden,
};
