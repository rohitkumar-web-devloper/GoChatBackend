const { deleteRouter } = require('../../Routes/deleteRoutes')
const Token = require('../../models/Token')
const TokenVerify = require("../../Middleware/TokenVerify")
const { success, wrapRequestHandler, error } = require("../../helper/response")
const handler = async (req, res) => {
    try {
        const destroy = await Token.deleteOne({ token: req.login_token.token })
        res.json(success("Logout Successfully", destroy))
    } catch (err) {
        res.json(error("Banner Removed Error", err))
    }
}
deleteRouter.delete('/user-logout', TokenVerify(), wrapRequestHandler(handler))