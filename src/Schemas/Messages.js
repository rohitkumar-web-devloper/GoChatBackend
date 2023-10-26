const mongoose = require('mongoose');
// Define a Mongoose schema
const Schema = mongoose.Schema;

const message = new Schema({
    receiver: Number,
    sender: Number,
    messages: {
        type: Array,
        required: true
    },
    time: Number,
});

// Create a Mongoose model using the schema
const Messages = mongoose.model('Messages', message);

// Export the model for use in other parts of your application
module.exports = Messages;
