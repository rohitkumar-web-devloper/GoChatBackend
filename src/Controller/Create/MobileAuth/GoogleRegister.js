const { createRouter } = require('../../../Routes/createRoutes')
const {User,Token}= require('../../../models/Model')
const { success, error, wrapRequestHandler } = require('../../../helper/response')
var jwt = require('jsonwebtoken')
const handler = async (req, res) => {
    try {
        const exist = await User.findOne({ email: req.body.email })
        if (!exist) {
            const exist = await User({ ...req.body }).save()
            console.log(exist)
            if (exist) {
                let userToken = jwt.sign({
                    data: req.body
                }, process.env.APP_TOKEN_KEY);
                const tokenCheck = await Token({ user_id: exist._id, token: userToken }).save()
                return res.json(success("User Login Successfully", { token: tokenCheck.token }))
            }
        } else {
            return res.json(error("User Already exist"))
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
createRouter.post('/google-register-app', wrapRequestHandler(handler))
