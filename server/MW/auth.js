const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
// var ls = require('local-storage');

module.exports = (request, response, next) => {
    let token, decode;
    try {
        token=request.get("Authorization").split(" ")[1];
        decode = jwt.verify(token, process.env.SECRET_KEY)

    } catch (error) {
        error.message = "No Authorized";
        error.status = 403;
        next(error);
    }

    if (decode !== undefined) {
        request.role = decode.role;
        request.id = decode.id;
        request.username = decode.username;

        next();
    }
}
