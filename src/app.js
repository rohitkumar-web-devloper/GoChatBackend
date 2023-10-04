const express = require('express');
const app = express();
const cors = require('cors')
const fileUpload = require('express-fileupload')
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://192.168.1.47:3000",
    ]
}))
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    tempFileDir: 'assets'
}))
app.use(express.json());
app.use(express.static('assets'))
module.exports = {
    app
}