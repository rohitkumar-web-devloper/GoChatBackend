const { createRouter } = require('../../Routes/createRoutes')
const { User, Token } = require('../../models/Model')
const { success, error, wrapRequestHandler } = require('../../helper/response')
var jwt = require('jsonwebtoken')
const handler = async (req, res) => {
    try {
        const exist = await User.findOne({ email: req.body.email })
        if (!exist) {
            let userToken = jwt.sign({
                data: req.body
                // eslint-disable-next-line no-undef
            }, process.env.APP_TOKEN_KEY);
            const exist = await User({ ...req.body }).save()
            if (exist) {
                const tokenSet = await Token({ user_id: exist._id, token: userToken }).save()
                res.json(success("User Registered", { token: tokenSet.token }))
            }
        } else {
            res.status(400).json(error("User Already exist"))
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
createRouter.post('/google-register', wrapRequestHandler(handler))
