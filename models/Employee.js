const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: 'Please Enter first name'
    },
    lastname: {
        type: String,
        required: 'Please Enter last name'
    },
    nin: {
        type: String,
        unique: true,
        required: 'Please Enter NIN'
    },
    gender: String,
    pastincidence: [{
        type: String
    }],
    imageupload: String,
    role: String

});

module.exports = mongoose.model('Employee', employeeSchema);