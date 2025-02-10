const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.userToken, process.env.SECRET_KEY, (err, payload) => {
    if (err) res.status(401).end();
    else (req.body.userId = payload.userId), next();
  });
};
