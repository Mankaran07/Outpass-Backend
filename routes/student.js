const express = require("express");
const { createStudent, findStudent } = require("../repository/Student");
const { createToken } = require("../middleware/authentication");
const Student = require("../models/Student");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      registerationNumber,
      roomNumber,
      password,
      mobileNumber,
      course,
      block,
      type,
    } = req.body;
    if (
      !name ||
      !registerationNumber ||
      !roomNumber ||
      !password ||
      !mobileNumber ||
      !course ||
      !block ||
      !type
    ) {
      console.log(
        `name: ${name}, registerationNumber: ${registerationNumber},roomNumber: ${roomNumber}, password: ${password},mobileNumber: ${mobileNumber}, course: ${course}, block: ${block}, type: ${type}`
      );
      res.status(400).json({
        error: "BAD REQUEST",
      });
    }

    if (type === "student") {
      const student = Student.findOne({ registerationNumber });
      if (student) {
        return res.status(403).json({ error: "User already exists" });
      }
      const data = await createStudent({
        name,
        registerationNumber,
        roomNumber,
        password,
        mobileNumber,
        course,
        block,
      });
      const token = createToken({ registerationNumber, type });
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
    const { registerationNumber, password, type } = req.body;
    if (!registerationNumber || !password || !type) {
      console.log(
        `registerationNumber: ${registerationNumber}, password: ${password},type: ${type}`
      );
      res.status(400).json({
        error: "BAD REQUEST",
      });
    }
    if (type === "student") {
      const data = await findStudent({ registerationNumber, password });
      const token = createToken({ type, id: data._id });

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

module.exports = router;
