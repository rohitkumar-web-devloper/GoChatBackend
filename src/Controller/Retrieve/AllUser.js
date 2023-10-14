const TokenVerify = require('../../Middleware/TokenVerify')
const { retrieveRouter } = require('../../Routes/retrieveRouter')
const { wrapRequestHandler, success, error } = require('../../helper/response')
const { User } = require('../../models')
const { Op } = require("sequelize");
const handler = async (req, res) => {
    try {
        const allUser = await User.findAll({
            attributes:["id" , "fullName" , "photoUrl"],
            where: {
                id: {
                    [Op.not]: req.login_token.userId
                }
            }
        })
        if (allUser) {
            res.json(success("", allUser))
        } else {
            res.json(error("users not retrieve"))
        }
    } catch (error) {
        res.status(400).json(error)
    }
}
retrieveRouter.get('/all-user', TokenVerify(), wrapRequestHandler(handler))