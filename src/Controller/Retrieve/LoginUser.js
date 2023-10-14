const TokenVerify = require('../../Middleware/TokenVerify')
const { retrieveRouter } = require('../../Routes/retrieveRouter')
const { wrapRequestHandler, success, } = require('../../helper/response')
const { User } = require('../../models')
const handler = async (req, res) => {
    try {
        console.log(req.query)
        const LoginUser = await User.findOne({
            where: {
                id: req.login_token.id
            }
        })
        res.json(success("Login User", LoginUser))
    } catch (error) {
        res.status(400).json(error)
    }
}
retrieveRouter.get('/login-user', TokenVerify(), wrapRequestHandler(handler))