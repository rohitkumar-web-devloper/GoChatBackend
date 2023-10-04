const { validationResult } = require('express-validator');
const { success, wrapRequestHandler, error } = require("./response")
const validate = validations => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        // res.status(400).json({ errors: errors.array() });
        res.status(400).json(error("error", errors.array()))
    };
};

module.exports = { validate }