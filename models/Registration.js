const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: 'Please Enter first name'
    },
    lastname: String,
    username:{
        type: String,
        unique: true,
        required: 'Please Enter User name' 
    },
    password: String
  });

module.exports = mongoose.model('Registration', registrationSchema);