function success (message, data){
    return {
        data,
        type: "success",
        message
    };
}

function error (message, errors = [], data = null){
    return {
        data,
        errors,
        message,
        type: "error"
    };
}

function response (data, message = "Success"){
    return {
        data,
        type: "success",
        message
    };
}

const wrapRequestHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);

module.exports = {
    success,
    error,
    response,
    wrapRequestHandler
};