const mongoose = require("mongoose");
const { Schema } = mongoose;

const outpassSchema = new Schema({
  journey_from: {
    type: Date,
    required: true,
  },
  journey_to: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  modeOfTrasport: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  statusByHod: {
    type: String,
    default: "pending",
  },
  statusByWarden: {
    type: String,
    default: "pending",
  },
  student: {
    type: String,
    required: true,
  },
});

const Outpass = mongoose.model("Outpass", outpassSchema);

module.exports = Outpass;
