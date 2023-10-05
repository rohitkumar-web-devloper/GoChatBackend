const { retrieveRouter } = require('../../Routes/retrieveRouter')
// const { User, Token } = require('../../models/Model')
const User = require('../../models/Register')
const { success, wrapRequestHandler } = require('../../helper/response')
const TokenVerify = require('../../Middleware/TokenVerify')
const handler = async (req, res) => {
    try {
        let user;
        req.query.value === '' ?
            user = []
            :
            user = await User.find({
                _id: { $nin: req.login_token.user_id }, $or: [
                    { fullName: { $regex: new RegExp(req.query.value) } },
                    { email: { $regex: new RegExp(req.query.value) } },
                    // Add more conditions as needed...
                ]
            })
        return res.json(success("user Retrieve", user))
    } catch (error) {
        return res.json(error("user Retrieve", error))
    }
}
retrieveRouter.get('/debounce-user', TokenVerify(), wrapRequestHandler(handler))
