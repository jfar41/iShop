const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function (req, res, next) {
    let token = req.get('Authorization') || req.query.token;
    if (token) {
        //remove the bearer(a token) if it was included in the Authorization header
        //when making requests to protected resources
        token = token.replace('Bearer ', '');
        //jwt.sign(payload, secretOrPrivateKey, [options, callback])
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                next(err);
            } else {
                //token is valid, add user to req object
                req.user = decoded.user;
                next()
            }
        });
    } else {
        next();
    }
};