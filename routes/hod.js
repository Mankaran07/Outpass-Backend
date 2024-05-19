const express = require("express");
const { createHod, findHod } = require("../repository/Hod");
const { createToken } = require("../middleware/authentication");
const Hod = require("../models/Hod");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, collegeId, password, course, type } = req.body;
    if (!name || !collegeId || !password || !course || !type) {
      console.log(
        `name: ${name}, collegeId: ${collegeId}, password: ${password}, course: ${course}, type: ${type}`
      );
      res.status(400).json({
        error: "BAD REQUEST",
      });
    }

    if (type === "hod") {
      const hod = await Hod.findOne({ collegeId });
      if (hod) {
        return res.status(403).json({ error: "User already exists" });
      }
      const data = await createHod({ name, collegeId, password, course });
      const token = createToken({ collegeId, type });
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
    const { collegeId, password, type } = req.body;
    if (!collegeId || !password || !type) {
      console.log(
        `collegeId: ${collegeId}, password: ${password},type: ${type}`
      );
      res.status(400).json({
        error: "BAD REQUEST",
      });
    }
    if (type === "hod") {
      const data = await findHod({ collegeId, password });
      const token = createToken({ collegeId, type, id: data._id });
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
