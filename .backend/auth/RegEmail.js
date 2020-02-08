const sgMail = require("@sendgrid/mail");
const secrets = require("../config/secrets.js");

function RegEmail(req, res, next) {
    const email = {
        to: req.body.email,
        subject: "Registration Complete!",
        text: "Thank You for Registering, your username is: " + req.body.username,
        from: "No-Reply@SoAccellerated.com"
    };
    sgMail.setApiKey(secrets.sendgridkey);
    sgMail.send(email);
    next();
}

module.exports = RegEmail;