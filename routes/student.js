const express = require("express");
const { createStudent, findStudent } = require("../repository/Student");
const { createToken } = require("../middleware/authentication");
const Student = require("../models/Student");
const { findOutpassStudent } = require("../repository/outpass");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      registrationNumber,
      roomNumber,
      password,
      mobileNumber,
      course,
      block,
      type,
    } = req.body;
    if (
      !name ||
      !registrationNumber ||
      !roomNumber ||
      !password ||
      !mobileNumber ||
      !course ||
      !block ||
      !type
    ) {
      console.log(
        `name: ${name}, registrationNumber: ${registrationNumber},roomNumber: ${roomNumber}, password: ${password},mobileNumber: ${mobileNumber}, course: ${course}, block: ${block}, type: ${type}`
      );
      return res.status(400).json({
        error: "BAD REQUEST",
      });
    }

    if (type === "student") {
      const student = await Student.findOne({ registrationNumber });
      if (student) {
        return res.status(403).json({
          error: "User already exists",
          success: false,
        });
      }
      const data = await createStudent({
        name,
        registrationNumber,
        roomNumber,
        password,
        mobileNumber,
        course,
        block,
      });
      const token = createToken({ registrationNumber, type });
      return res.status(201).json({
        token: token,
        data: data,
        success: true,
      });
    }
    return res.status(203).json({
      error: "Wrong Type",
      success: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      error: error,
      success: false,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { registrationNumber, password, type } = req.body;
    if (!registrationNumber || !password || !type) {
      console.log(
        `registrationNumber: ${registrationNumber}, password: ${password},type: ${type}`
      );
      res.status(400).json({
        error: "BAD REQUEST",
      });
    }
    if (type === "student") {
      const data = await findStudent({ registrationNumber, password });
      const token = createToken({ registrationNumber, type });
      return res.status(201).json({
        token: token,
        data: data,
        success: true,
      });
    }
    return res.status(203).json({
      error: "Wrong Type",
      success: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      error: error,
      success: false,
    });
  }
});

router.get("/status", async (req, res) => {
  try {
    const id = req.headers["id"];
    const data = await findOutpassStudent(id);
    return res.status(200).json({ outpass: data });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      error: error,
      success: false,
    });
  }
});

module.exports = router;
