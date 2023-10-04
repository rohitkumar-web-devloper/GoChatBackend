const { retrieveRouter } = require('../../Routes/retrieveRouter')
// const { User, Token } = require('../../models/Model')
const User = require('../../models/Register')
const { success, error, wrapRequestHandler } = require('../../helper/response')
const TokenVerify = require('../../Middleware/TokenVerify')
const handler = async (req, res) => {
    try {
        const user = await User.find({ _id: { $nin: req.login_token.user_id }, fullName: { $regex: new RegExp(req.query.value), } })
        return res.json(success("user Retrieve", user))
    } catch (error) {
        return res.json(error("user Retrieve", error))
    }
}
retrieveRouter.get('/debounce-user', TokenVerify(), wrapRequestHandler(handler))
