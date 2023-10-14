/* eslint-disable no-undef */
const requireDir = require('require-dir')
require('dotenv').config();
const connection = require('./config/mongoseConfig');
const { server } = require('./Socket');
const { PORT } = process.env
requireDir('./Controller', { recurse: true });
requireDir('./Routes');
connection
server.listen(PORT, () => {
    console.log(`Server run on port no. ${PORT}`)
}) 