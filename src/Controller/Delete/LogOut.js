const { deleteRouter } = require('../../Routes/deleteRoutes')
const { wrapRequestHandler, success } = require('../../helper/response')
const TokenVerify = require("../../Middleware/TokenVerify")
const { Token } = require('../../models')

const handler = async (req, res) => {
    try {
        await Token.destroy({
            where: {
                // userId: req.login_token.userId,
                token: req.login_token.token
            }
        })
        res.Json(success("User Logout successfully"))
    } catch (error) {
        res.status(400).json(success("", error))
    }
}

deleteRouter.delete('/logout', TokenVerify(), wrapRequestHandler(handler))