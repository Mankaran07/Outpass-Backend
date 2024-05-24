const express = require("express");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const {
      journey_from,
      journey_to,
      state,
      zip,
      modeOfTrasport,
      reason,
      student,
    } = req.body;
    if (
      !journey_from ||
      !journey_to ||
      !state ||
      !zip ||
      !modeOfTransport ||
      !reason ||
      !student
    ) {
      console.log(
        `journey_from: ${journey_from}, journey_to: ${journey_to}, state: ${state}, zip: ${zip}, modeOfTransport: ${modeOfTransport}, Reason: ${Reason}, Student: ${Student}`
      );
      res.status(400).json({
        error: "BAD REQUEST",
      });
      return;
    }
    const outpass = createOutpass({
      journey_from,
      journey_to,
      state,
      zip,
      modeOfTrasport,
      reason,
      student,
    });
    return res.status(201).json({ data: outpass, success: true });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      error: error,
      success: false,
    });
  }
});

module.exports = router;
