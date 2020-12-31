const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.cookies.Oauth_token;
  if (!token) return res.status(401).redirect('/login');

  try {
    const verifyedUser = jwt.verify(token, process.env.TOKEN_SECREAT);
    req.user = verifyedUser;
  } catch (error) {
    res.status(401);
    console.log(error);
  }
  next();
};
