
const TokenVerify = require('../../Middleware/TokenVerify')
const { retrieveRouter } = require('../../Routes/retrieveRouter')
const { wrapRequestHandler, success, error } = require('../../helper/response')
const { User, follows } = require('../../models')
// const { Op } = require("sequelize");
const handler = async (req, res) => {
    try {
        const allUser = await User.findOne({
            attributes: ["id", "fullName", "photoUrl"],
            where: {
                id: req.query.id
            },
            include: [
                {
                    attributes: ["follower", "following"],
                    model: follows,
                    as: "followData"
                }
            ]
        })
        // console.log(JSON.parse(allUser.followData.follower), "oooooooo")
        if (allUser) {
            res.json(success("", allUser))
        } else {
            res.json(error("users not retrieve"))
        }
    } catch (error) {
        res.status(400).json(error)
    }
}
retrieveRouter.get('/debounce-user-profile', TokenVerify(), wrapRequestHandler(handler))