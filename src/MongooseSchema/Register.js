const mongoose = require('mongoose')
const register = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    role_id: {
        type: Number,
        default: null
    },


})

const Register = new mongoose.model('register', register)
module.exports = Register;