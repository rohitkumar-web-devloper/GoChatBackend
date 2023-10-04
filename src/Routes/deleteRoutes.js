const { Router } = require("express");
const { apiRouter } = require("./apiRoutes")
const deleteRouter = Router()
apiRouter.use('/delete', deleteRouter)
module.exports = { deleteRouter };