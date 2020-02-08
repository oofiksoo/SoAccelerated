const Requests = require("./request-model.js");
const sgMail = require("@sendgrid/mail");
const secrets = require("../config/secrets.js");

function validateRequestId(req, res, next) {
    const id = req.params.id;
    Requests.getById(id)
        .then(request => {
            if (!request) {
                res.status(400).json({ message: "Invalid Request id." });
            } else {
                req.request = request;
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error retrieving Request id." });
        });
}

function newTicketEmail(req, res, next) {
    const emailmsg = {
        to: "test@test.com",
        subject: "Dev Desk Help Request Ticket Submitted!",
        text: "Thank You for Submitting your request for assistance! \r\n A helper will be in contact with you shortly. Included below is the contents of your Dev Desk Queue ticket: \r\n" +
            "\r\n Title: \r\n" +
            req.body.request_title +
            "\r\n Date:  \r\n" +
            req.body.request_date +
            "\r\n Deatils: \r\n" +
            req.body.request_details +
            "\r\n Helper Assigned \r\n" +
            req.body.helperId +
            "\r\n Status: \r\n" +
            req.body.resolved,
        from: "no-reply@sender.com"
    };
    Requests.findById(req.body.creatorId)
        .then(student => {
            emailmsg.to = student.email ? student.email : "test@test.com";
            sgMail.setApiKey(secrets.sendgridkey);
            sgMail.send(emailmsg);
            next();
        })
        .catch(
            err =>
            console.log(err) &
            res.status(500).json({ message: "Error Sending Email to Student" })
        );
}

function updateTicketEmail(req, res, next) {
    const emailmsg = {
        to: "test@test.com",
        subject: "Your Dev Desk Queue Help Request Ticket Has Been Updated!",
        text: "Thank You for Submitting your request for assistance.\r\n An update has been made to your Dev Desk Queue request ticket. Please see the updated details of your request below:\r\n" +
            "\r\n Title: \r\n" +
            req.body.request_title +
            "\r\n Date:  \r\n" +
            req.body.request_date +
            "\r\n Deatils: \r\n" +
            req.body.request_details +
            "\r\n Helper Assigned \r\n" +
            req.body.helperId +
            "\r\n Status: \r\n" +
            req.body.resolved,
        from: "no-reply@sender.com"
    };
    Requests.findById(req.body.creatorId)
        .then(student => {
            emailmsg.to = student.email ? student.email : "test@test.com";
            sgMail.setApiKey(secrets.sendgridkey);
            sgMail.send(emailmsg);
            next();
        })
        .catch(err =>
            res.status(500).json({ message: "Error sending Email to student" })
        );
}

function deleteTicketEmail(req, res, next) {
    const id = req.params.id;
    const emailmsg = {
        to: "test@test.com",
        subject: "Your Dev Desk Queue Help Request Ticket Has Been Deleted",
        text: "Thank You for Submitting your request for assistance.\r\n Your ticket has been deleted from Dev Desk Queue, and will no longer be available for helpers to assign and resolve. We hope you found a solution to your issue. If you experiance this, or any issue in the future, Please feel free to submit another Dev Desk Queue Request Ticket.\r\n",
        from: "no-reply@sender.com"
    };
    Requests.getById(id).then(request => {
        Requests.findById(request.creatorId)
            .then(student => {
                emailmsg.to = student.email ? student.email : "test@test.com";
                sgMail.setApiKey(secrets.sendgridkey);
                sgMail.send(emailmsg);
                next();
            })
            .catch(err =>
                res.status(500).json({ message: "Error fetching student" })
            );
    });
}
module.exports = {
    validateRequestId,
    newTicketEmail,
    updateTicketEmail,
    deleteTicketEmail
};