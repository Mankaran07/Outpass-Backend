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
  Reason: {
    type: String,
    required: true,
  },
  statusByHod: {
    type: Boolean,
    required: true,
  },
  statusByWarden: {
    type: Boolean,
    required: true,
  },
});

const Outpass = mongoose.model("Outpass", outpassSchema);

module.exports = Outpass;
