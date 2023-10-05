const { updateRouter } = require('../../Routes/updateRoutes')
// const { User, Token } = require('../../models/Model')
const User = require('../../models/Register')
const { success, wrapRequestHandler } = require('../../helper/response')
const TokenVerify = require('../../Middleware/TokenVerify')
const handler = async (req, res) => {
    try {
        const following = await User.findOne({ _id: req.login_token.user_id })
        const follower = await User.findOne({ _id: req.body._id })

        if (following && follower) {
            const exist = following.following?.find(pq => pq === req.body._id);
            const exist_2 = follower.follower?.find(pq => pq === req.login_token.user_id);
            if (exist && exist_2) {
                let index_1 = following.following.indexOf(req.body._id)
                let index_2 = follower.follower.indexOf(req.login_token.user_id)
                following.following.splice(index_1, 1)
                follower.follower.splice(index_2, 1)
                await User.findOneAndUpdate({ _id: req.login_token.user_id }, { following: following.following })
                await User.findOneAndUpdate({ _id: req.body._id }, { follower: follower.follower })
                const user = await User.findOne({ _id: req.body._id })
                return res.json(success("user Follow successfully", user))
            } else {
                following.following.push(req.body._id)
                follower.follower.push(req.login_token.user_id)
                const updateData = await User.findOneAndUpdate({ _id: req.login_token.user_id }, { following: following.following })
                const yo = await User.findOneAndUpdate({ _id: req.body._id }, { follower: follower.follower })
                if (updateData && yo) {
                    const user = await User.findOne({ _id: req.body._id })
                    return res.json(success("user Follow successfully", user))
                }
            }
        }
    } catch (error) {
        return res.json(error("user Retrieve", error))
    }
}
updateRouter.put('/follow', TokenVerify(), wrapRequestHandler(handler))
