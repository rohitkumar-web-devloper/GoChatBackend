const TokenVerify = require('../../Middleware/TokenVerify')
const { retrieveRouter } = require('../../Routes/retrieveRouter')
const { Messages } = require('../../Schemas')
const { wrapRequestHandler, success, } = require('../../helper/response')
const handler = async (req, res) => {
    try {
        const message = await Messages.findOne({ sender: +req.query.sender, receiver: +req.query.receiver })
        res.json(success("Chat Retrieve", message))
    } catch (error) {
        res.status(400).json(error)
    }
}
retrieveRouter.get('/messages', TokenVerify(), wrapRequestHandler(handler))