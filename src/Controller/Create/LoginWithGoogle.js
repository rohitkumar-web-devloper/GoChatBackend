const { createRouter } = require('../../Routes/createRoutes')
const { User, Token } = require('../../models/Model')
const { success, error, wrapRequestHandler } = require('../../helper/response')
// const { validate } = require('../../helper/validation')
// const { body } = require('express-validator')
var jwt = require('jsonwebtoken')
const handler = async (req, res) => {
    try {
        const { uid, email } = req.body
        const exist = await User.findOne({ uid, email })
        if (exist) {
            let userToken = jwt.sign({
                data: req.body
                // eslint-disable-next-line no-undef
            }, process.env.APP_TOKEN_KEY);
            const tokenCheck = await Token({ user_id: exist._id, token: userToken }).save()
            return res.json(success("User Login Successfully", { token: tokenCheck.token, }))
        } else {
            return res.json(error("User not Found",))
        }   
    } catch (error) {
        res.status(400).send(error)
    }
}
createRouter.post('/google-login', wrapRequestHandler(handler))
