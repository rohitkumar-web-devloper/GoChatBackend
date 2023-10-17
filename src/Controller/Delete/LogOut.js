const { deleteRouter } = require('../../Routes/deleteRoutes')
const { wrapRequestHandler, success } = require('../../helper/response')
const TokenVerify = require("../../Middleware/TokenVerify")
const { Token } = require('../../models')

const handler = async (req, res) => {
    try {
        console.log(req.login_token.token)
        await Token.destroy({
            where: {
                // userId: req.login_token.userId,
                token: req.login_token.token
            }
        })
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2h1YWdyYTI4MjAxMEBnbWFpbC5jb20iLCJpYXQiOjE2OTczNjY0NjZ9.I5NBhyxo_xhlTMZuy4mWRa39wLsiJl56FzFCFlWWg9I
        res.json(success("User Logout successfully"))
    } catch (error) {
        console.log("dsfd")
        res.status(400).json(success("", error))
    }
}

deleteRouter.delete('/logout', TokenVerify(), wrapRequestHandler(handler))