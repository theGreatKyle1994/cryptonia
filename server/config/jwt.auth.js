const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.userToken, process.env.SECRET_KEY, (err, payload) => {
    console.log(payload, "jwt:auth:5");
    if (err) res.status(401).json({ verified: false });
    else (req.body.userId = payload.userId), next();
  });
};
