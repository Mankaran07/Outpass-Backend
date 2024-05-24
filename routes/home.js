const express = require("express");
const { verifyToken } = require("../middleware/authentication");

const router = express.Router();

router.post("/me", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      console.log("Token :", token);
      return res.status(400).json({
        error: "BAD REQUEST",
      });
    }
    const data = verifyToken(token);
    res.status(200).json({
      data: data,
      success: true,
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
