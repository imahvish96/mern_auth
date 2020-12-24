const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(400).send('Access Denied');

    try {
        const verifyedUser = jwt.verify(token, process.env.TOKEN_SECREAT);
        let userInfo = req.user = verifyedUser;
        console.log("**************",userInfo);
        req.user = verifyedUser
    } catch(error) {
        res.status(401).send('Invalid Token');
    }
    next();
}