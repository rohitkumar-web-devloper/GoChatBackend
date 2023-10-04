const { Router } = require("express");
const { app } = require('../app')

const apiRouter = Router();
app.use('/api', apiRouter)
module.exports = { apiRouter }