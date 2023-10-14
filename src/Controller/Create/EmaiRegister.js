/* eslint-disable no-undef */
const { createRouter } = require('../../Routes/createRoutes')
const { wrapRequestHandler, success, error } = require('../../helper/response')
const { User, Token, follows } = require('../../models')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const handler = async (req, res) => {
    try {
        const exist = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        if (!exist) {
            let userToken = jwt.sign({ email: req.body.email }, process.env.APP_TOKEN_KEY);
            const user = await User.create(req.body)
            if (user) {
                const tokenSet = await Token.create({ userId: user.id, token: userToken })
                await follows.create({ userId: user.id, follower: JSON.stringify([]), following: JSON.stringify([]) })
                res.json(success("User Registered", { token: tokenSet.token, id: tokenSet.userId }))

            }
        } else {
            res.status(400).json(error("User Already exist"))
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
createRouter.post('/email-register', wrapRequestHandler(handler))
