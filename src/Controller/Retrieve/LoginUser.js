const TokenVerify = require('../../Middleware/TokenVerify')
const { retrieveRouter } = require('../../Routes/retrieveRouter')
const { wrapRequestHandler, success, } = require('../../helper/response')
const { User, follows } = require('../../models')
const handler = async (req, res) => {
    try {
        const LoginUser = await User.findOne({
            attriubutes: ["fullName", "photoUrl", "email"],
            where: {
                id: req.login_token.userId
            },
            include: [
                {
                    attributes: ["follower", "following"],
                    model: follows,
                    as: "followData"
                }
            ]
        })
        res.json(success("Login User", LoginUser))
    } catch (error) {
        res.status(400).json(error)
    }
}
retrieveRouter.get('/login-user', TokenVerify(), wrapRequestHandler(handler))