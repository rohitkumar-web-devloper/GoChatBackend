const { Router } = require("express");
const { apiRouter } = require("./apiRoutes")
const updateRouter = Router()
apiRouter.use('/update', updateRouter)
module.exports = { updateRouter };