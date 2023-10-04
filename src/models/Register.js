const mongoose = require('mongoose')
const user = new mongoose.Schema({
    uid: {
        type: String,
        default: null
    },
    idToken: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: null,
    },
    lastName: {
        type: String,
        default: null
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: null
    },
    photoUrl: {
        type: String,
        default: "default_image.jpg"
    },
    follower: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    }

})

const User = new mongoose.model('Users', user)
module.exports = User;