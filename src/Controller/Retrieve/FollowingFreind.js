const TokenVerify = require('../../Middleware/TokenVerify')
const { retrieveRouter } = require('../../Routes/retrieveRouter')
const { wrapRequestHandler, success, error } = require('../../helper/response')
const { follows, User } = require('../../models')
const { Op } = require("sequelize");
const handler = async (req, res) => {
    try {
        const result = await follows.findOne({
            attributes: ["following"],
            where: {
                userId: req.login_token.userId
            }
        })

        const followingFriend = JSON.parse(result.following)
        const allUser = await User.findAll({
            attributes: ["id", "fullName", "photoUrl"],
            where:
            {
                // id: {
                //     [Op.not]: req.login_token.userId
                // },
                id: followingFriend,
                [Op.or]: {
                    fullName: { [Op.like]: "%" + req.query.value + "%" },

                },
            },
            include: [
                {
                    attributes: ["follower", "following"],
                    model: follows,
                    as: "followData"
                }
            ]
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
retrieveRouter.get('/following-friend', TokenVerify(), wrapRequestHandler(handler))