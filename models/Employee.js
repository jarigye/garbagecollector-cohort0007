//require mongoose
const mongoose = require('mongoose');

//create a schema for the data you need to save
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
    pastincidence:[{
        type: String
    }],
    imageupload: String,
    role: String

})

//export the mongoose model
module.exports = mongoose.model('Employee', employeeSchema);
