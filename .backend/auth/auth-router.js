const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model.js");
const secrets = require("../config/secrets.js");
const RegEmail = require("./RegEmail.js");

router.post("/register", RegEmail, (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                req.session.loggedIn = true;
                req.session.userId = user.id;
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token,
                    username: user.username,
                    userid: user.id
                });
            } else {
                res.status(401).json({ message: "Authentication Failed" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        userid: user.id
    };

    const options = {
        expiresIn: "1d"
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ Error: err });
            } else {
                res.status(200).json({ message: " Logged out " });
            }
        });
    } else {
        res.status(204);
    }
});

module.exports = router;