const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the Hod collection
const hodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    collegeId: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

// Create the model for the Hod collection
const Hod = mongoose.model('Hod', hodSchema);

// Export the model
module.exports = Hod;
