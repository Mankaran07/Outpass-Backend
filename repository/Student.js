const Student = require("../models/Student");

async function createStudent(user) {
  try {
    const student = await Student.create(user);
    return student;
  } catch (error) {
    console.log("Something went wrong while creating Student!!");
    throw error;
  }
}
async function findStudent(user) {
  try {
    const data = await Student.findOne(user);
    return data;
  } catch (error) {
    console.log("Something went wrong while searching Student!!");
    throw error;
  }
}

module.exports = {
  createStudent,
  findStudent,
};
