const { Mongoose } = require("mongoose");
const Outpass = require("../models/Outpass");
const Student = require("../models/Student");
const { verifyToken } = require("../middleware/authentication");

exports.generatePass = async (req, res) => {
  try {
    const {
      journery_from,
      journery_to,
      state,
      zip,
      modeOfTransport,
      Reason,
      userId,
    } = req.body;

    if (
      !journery_from ||
      !journery_to ||
      !state ||
      !zip ||
      !modeOfTransport ||
      !Reason ||
      !userId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find the student by ID
    const student = await Student.findById(userId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    console.log(student);
    const outPassDetails = await Outpass.create({
      journey_from: journery_from,
      journey_to: journery_to,
      state: state,
      zip: zip,
      modeOfTransport: modeOfTransport,
      Reason: Reason,
      userId: userId,
    });

    console.log(outPassDetails);

    student.OutpassId.push(outPassDetails._id);
    await student.save();

    console.log(outPassDetails);
    return res.status(200).json({
      success: true,
      message: "Outpass generated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
