const Hod = require("../models/Hod");

async function createHod(user) {
  try {
    const hod = await Hod.create(user);
    return hod;
  } catch (error) {
    console.log("Something went wrong while creating HOD!!");
    throw error;
  }
}

async function findHod(user) {
  try {
    const data = await Hod.findOne(user);
    return data;
  } catch (error) {
    console.log("Something went wrong while searching HOD!!");
    throw error;
  }
}

module.exports = {
  createHod,
  findHod,
};
