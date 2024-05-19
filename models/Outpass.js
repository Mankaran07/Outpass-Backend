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
  modeOfTransport: {
    type: String,
    required: true,
  },
  Reason: {
    type: String,
    required: true,
  },
  statusByHod: {
    type: Boolean,
    default: false,
  },
  statusByWarden: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

const Outpass = mongoose.model("Outpass", outpassSchema);

module.exports = Outpass;
