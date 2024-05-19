const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  registerationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  OutpassId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outpass",
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
