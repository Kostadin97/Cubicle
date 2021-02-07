const jwt = require('jsonwebtoken');
const cookieName = 'USER_SESSION';
const secret = 'navcho';

module.exports = function() {
    return (req, res, next) => {
        let token = req.cookies(cookieName);
        if (token) {
            //verify token
            jwt.verify(token, secret, (err, encoded) => {
                if (err) {
                    return console.log(err);
                }
                console.log(decoded);
            })
                

        }
        
        next();
    }
}