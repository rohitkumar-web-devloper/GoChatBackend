const TokenVerify = require('../../Middleware/TokenVerify')
const { updateRouter } = require('../../Routes/updateRoutes')
const { wrapRequestHandler, success, } = require('../../helper/response')
const { follows } = require('../../models')
const handler = async (req, res) => {
    try {
        const followers = await follows.findOne({
            attributes: ["follower",],
            where: {
                userId: req.body.id
            }
        })
        const following = await follows.findOne({
            attributes: ["following"],
            where: {
                userId: req.login_token.userId
            }
        })
        var rohit = JSON.parse(followers.follower)
        const anshu = JSON.parse(following.following)
        const exist = rohit.findIndex(pq => pq === req.login_token.userId);
        const exist2 = anshu.findIndex(pq => pq === req.body.id);
        if (exist === -1 && exist2 === -1) {
            rohit.push(req.login_token.userId);
            anshu.push(req.body.id);
        } else {
            rohit.splice(exist, 1); // Remove the element at the index 'exist'
            anshu.splice(exist, 1); // Remove the element at the index 'exist'
        }
        await follows.update({ follower: JSON.stringify(rohit) }, {
            where: {
                userId: req.body.id
            }
        })
        await follows.update({ following: JSON.stringify(anshu) }, {
            where: {
                userId: req.login_token.userId
            }
        })
        res.json(success("following"))
    } catch (error) {
        res.status(400).json(error)
    }
}
updateRouter.put('/follow-unfollow', TokenVerify(), wrapRequestHandler(handler))