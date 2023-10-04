const jwt = require('jsonwebtoken');
const { error } = require("../helper/response")
const Token = require('../models/Token')
const TokenVerify = () => async (req, res, next) => {
    const errorMessage = "Invalid Token Or Token expired or Unauthorized";
    const code = 401;
    let token_id = req.headers.authorization || req.query?.token_id || "";
    token_id = token_id.replace("Bearer ", "");
    if (!token_id) return res.status(401).send(error(errorMessage));
    try {
        const user = await jwt.verify(token_id, process.env.APP_TOKEN_KEY);
    } catch (e) {
        return res.status(401).send(error(errorMessage))
    }
    const token = await Token.findOne({ token: token_id });
    if (!token) {
        return res.status(401).send(error(errorMessage, code));
    }
    req.login_token = token;
    next();
};
module.exports = TokenVerify
