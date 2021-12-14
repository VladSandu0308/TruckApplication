const mongoose = require('mongoose');
const validator = require("email-validator");

const userSchema = new mongoose.Schema({
    lastname: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        maxLength: 50,
        validate: [validator.validate, 'invalid email'],
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 100,
        required: true
    },
});

const user = mongoose.model('user', userSchema);

module.exports = user;