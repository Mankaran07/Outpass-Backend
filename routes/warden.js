const express = require("express");
const { findWarden } = require("../repository/warden");
const { createToken } = require("../middleware/authentication");
const {
  findOutpassWarden,
  updateOutpassWarden,
} = require("../repository/outpass");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { wardenId, password, type } = req.body;
    if (!wardenId || !password || !type) {
      console.log(`wardenId: ${wardenId}, password: ${password},type: ${type}`);
      res.status(400).json({
        error: "BAD REQUEST",
      });
    }
    if (type === "warden") {
      const data = await findWarden({ wardenId, password });
      const token = createToken({ type });
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

router.get("/request", (req, res) => {
  try {
    const outpass = findOutpassWarden();
    return res.status(200).json({ outpass: outpass });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      error: error,
      success: false,
    });
  }
});

router.patch("/update", async (req, res) => {
  try {
    const { id, decision } = req.body;
    const data = updateOutpassWarden({ id, decision });
    return res.status(200).json({ message: "Outpass successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      error: error,
      success: false,
    });
  }
});

module.exports = router;
