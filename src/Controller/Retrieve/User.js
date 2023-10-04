const { retrieveRouter } = require('../../Routes/retrieveRouter')
// const { User, Token } = require('../../models/Model')
const User = require('../../models/Register')
const { success, error, wrapRequestHandler } = require('../../helper/response')
const TokenVerify = require('../../Middleware/TokenVerify')
const handler = async (req, res) => {
    try {
        const { _id } = req?.query
        if (_id) {
            const user = await User.findOne({ _id })
            const { following } = await User.findOne({ _id: req.login_token.user_id })
            const exist = following.find(pq => pq === _id)
            if (exist) {
                return res.json(success("user Retrieve", { user: user, exist: true }))

            } else {
                return res.json(success("user Retrieve", { user: user, exist: false }))
            }
        } else {
            const user = await User.findOne({ _id: req.login_token.user_id }, { "_id": 1, "fullName": 1, "follower": 1, "following": 1 , "photoUrl":1})
            return res.json(success("user Retrieve", user))
        }
    } catch (error) {
        return res.json(error("user Retrieve", error))
    }
}
retrieveRouter.get('/user', TokenVerify(), wrapRequestHandler(handler))
