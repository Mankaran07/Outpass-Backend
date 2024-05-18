const mongoose = require("mongoose");
const { Schema } = mongoose;

const wardenSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  wardenId: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
});

const Warden = mongoose.model("Warden", wardenSchema);

module.exports = Warden;
