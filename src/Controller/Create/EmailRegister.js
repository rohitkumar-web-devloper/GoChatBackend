/* eslint-disable no-undef */
const { createRouter } = require('../../Routes/createRoutes')
const { User, Token } = require('../../models/Model')
const { success, error, wrapRequestHandler } = require('../../helper/response')
var jwt = require('jsonwebtoken')
const { validate } = require('../../helper/validation')
const { body } = require('express-validator')
const bcrypt = require('bcryptjs');
const handler = async (req, res) => {
    try {
        const exist = await User.findOne({ email: req.body.email })
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        if (!exist) {
            const exist = await User({ ...req.body }).save()
            if (exist) {
                let userToken = jwt.sign({
                    data: req.body
                }, process.env.APP_TOKEN_KEY);
                const tokenCheck = await Token({ user_id: exist._id, token: userToken }).save()
                return res.json(success("User SignUp Successfully", { token: tokenCheck.token }))
            }
        } else {
            res.json(error("User Already exist"))
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
createRouter.post('/register-with-email', validate([
    body("email").notEmpty().withMessage("Email is required"),
    body("fullName").notEmpty().withMessage("Name is required"),
    body("password").notEmpty().withMessage("Password is required")
]), wrapRequestHandler(handler))
