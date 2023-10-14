/* eslint-disable no-undef */
const { createRouter } = require('../../Routes/createRoutes')
const { wrapRequestHandler, success, error } = require('../../helper/response')
const { User, Token } = require('../../models')
// const { Register } = require('../../MongooseSchema')
var jwt = require('jsonwebtoken')
const handler = async (req, res) => {
    try {
        const exist = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (exist) {
            let userToken = jwt.sign({ email: req.body.email }, process.env.APP_TOKEN_KEY);
            await Token.create({ userId: exist.id, token: userToken })
            return res.json(success("User Login Successfully", { token: userToken, id: exist.id }))
        } else {
            res.status(400).json(error("User Already exist"))
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
createRouter.post('/google-login', wrapRequestHandler(handler))
