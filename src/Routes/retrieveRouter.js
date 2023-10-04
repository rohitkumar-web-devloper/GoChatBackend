const { Router } = require("express");
const {apiRouter} = require("./apiRoutes")
const retrieveRouter = Router()
apiRouter.use('/retrieve' , retrieveRouter)
module.exports={retrieveRouter};