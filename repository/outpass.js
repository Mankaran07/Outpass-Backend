const Outpass = require("../models/Outpass");
const Hod = require("../models/Hod");

//Warden Routes
const findOutpassWarden = async () => {
  try {
    const data = await Outpass.find({ statusByWarden: "pending" });
    return data;
  } catch (error) {
    console.log("Something went wrong to fetch data from the Outpass");
    throw error;
  }
};

const updateOutpassWarden = async (data) => {
  try {
    const updatedOutpass = await Outpass.findByIdAndUpdate(data.id, {
      statusByWarden: data.decision,
    });
    return updatedOutpass;
  } catch (error) {
    console.log("Something went wrong to update the Outpass");
    throw error;
  }
};

//Hod Routes
const findOutpassHod = async (id) => {
  try {
    const hod = await Hod.findOne(id);
    console.log(hod);
    const data = await Outpass.find({ statusByHod: "pending" });
    return data;
  } catch (error) {
    console.log("Something went wrong to fetch data from the Outpass");
    throw error;
  }
};

const updateOutpassHod = async (data) => {
  try {
    const updatedOutpass = await Outpass.findByIdAndUpdate(data.id, {
      statusByHod: data.decision,
    });
    return updatedOutpass;
  } catch (error) {
    console.log("Something went wrong to update the Outpass");
    throw error;
  }
};

//Student Routes
const findOutpassStudent = async (id) => {
  try {
    const data = await Outpass.find({ Student: id });
    return data;
  } catch (error) {
    console.log("Something went wrong to find the Outpasses");
  }
};

const createOutpass = async (data) => {
  try {
    const outpass = await Outpass.create(data);
    return outpass;
  } catch (error) {
    console.log("Something went wrong while creating Outpass!!");
    throw error;
  }
};

module.exports = {
  findOutpassWarden,
  updateOutpassWarden,
  findOutpassHod,
  updateOutpassHod,
  findOutpassStudent,
  createOutpass,
};
