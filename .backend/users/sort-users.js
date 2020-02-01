const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (
                decodedToken &&
                decodedToken.department &&
                decodedToken.toLowerCase() === user.department
            ) {
                next();
            } else {
                res.status(403).json({ you: "have no power here" });
            }
        });
    } else {
        res.status(401).json({ Error: "No token or Invalid token provided" });
    }
};