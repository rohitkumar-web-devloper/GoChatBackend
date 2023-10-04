const { Router } = require("express");
const { apiRouter } = require('./apiRoutes')
const createRouter = Router()
apiRouter.use('/create', createRouter);
module.exports = { createRouter }
