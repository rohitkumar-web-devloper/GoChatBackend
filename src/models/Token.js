const mongoose = require('mongoose');
const token = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
})
const Token = new mongoose.model('Token', token)
module.exports = Token