const Opportunities = require("./opportunities-model.js");
const sgMail = require("@sendgrid/mail");
const secrets = require("../config/secrets.js");

function newEmail(req, res, next) {
    const emailmsg = {
        to: "No-Reply@SoAccellerated.com",
        subject: "So Accellerated Opportunity Submitted!",
        text: "Thank You for Submitting an Opportunity on So Acellerated! \r\n",
        from: "No-Reply@SoAccellerated.com"
    };
    Opportunities.findById(req.body.userId)
        .then(opportunity => {
            emailmsg.to = user.email ? user.email : "NO EMAIL RPOVIDED";
            sgMail.setApiKey(secrets.sendgridkey);
            sgMail.send(emailmsg);
            next();
        })
        .catch(
            err =>
            console.log(err) &
            res.status(500).json({ message: "Error Sending Email to User" })
        );
}

function updateEmail(req, res, next) {
    const emailmsg = {
        to: "No-Reply@SoAccellerated.com",
        subject: "So Accellerated Opportunity Updated!",
        text: "Your Opportunity on So Acellerated has been updated! \r\n",
        from: "No-Reply@SoAccellerated.com"
    };
    Opportunities.findById(req.body.creatorId)
        .then(opportunity => {
            emailmsg.to = user.email ? user.email : "NO EMAIL PROVIDED";
            sgMail.setApiKey(secrets.sendgridkey);
            sgMail.send(emailmsg);
            next();
        })
        .catch(err =>
            res.status(500).json({ message: "Error sending Email to User" })
        );
}

function deleteEmail(req, res, next) {
    const id = req.params.id;
    const emailmsg = {
        to: "No-Reply@SoAccellerated.com",
        subject: "So Accellerated Opportunity Deleted!",
        text: "Your Opportunity on So Acellerated has been deleted! \r\n",
        from: "No-Reply@SoAccellerated.com"
    };
    Opportunities.getById(id).then(opportunity => {
        Opportunities.findById(opportunity.userid)
            .then(opportunity => {
                emailmsg.to = user.email ? user.email : "NO EMAIL PROVIDED";
                sgMail.setApiKey(secrets.sendgridkey);
                sgMail.send(emailmsg);
                next();
            })
            .catch(err =>
                res.status(500).json({ message: "Error Sending Email to User" })
            );
    });
}
module.exports { newEmail, updateEmail, deleteEmail }