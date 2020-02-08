const Opportunities = require("./request-model.js");
const express = require("express");
const secrets = require("../config/secrets.js");
const { validateOpportunityID } = require("./validateOpportunityID.js");
const { newEmail, updateEmail, deleteEmail } = require("./sendEmail.js");
const router = express.Router();
const path = require("path");
const imgUpload = require("./imgUpload.js");
const sgMail = require("@sendgrid/mail");

router.post("/", newEmail, (req, res) => {
    Opportunities.insert(req.body)
        .then(opportunity => {
            res.status(201).json(opportunity);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error adding Opportunity" });
        });
});

router.get("/", (req, res) => {
    Opportunities.get()
        .then(opportunity => {
            res.status(200).json(opportunity);
        })
        .catch(error => {
            console.log("error on GET /api/opportunities/", error);
            res.status(500).json({
                errorMessage: "The opportunities data could not be retrieved."
            });
        });
});

router.get("/:id", validateOpportunityID, (req, res) => {
    const id = req.params.id;
    Opportunities.getById(id)
        .then(opportunity => {
            if (opportunity.length !== 0) {
                res.status(200).json(opportunity);
            } else {
                res.status(404).json({
                    errorMessage: "The opportunity with the specified ID does not exist."
                });
            }
        })
        .catch(error => {
            console.log("error on GET /api/opportunities/:id", error);
            res.status(500).json({
                errorMessage: "The Opportunity Data could not be retrieved."
            });
        });
});

router.delete("/:id", validateOpportunityID, deleteEmail, (req, res) => {
    const id = req.params.id;
    Opportunities.remove(id)
        .then(opportunity => {
            res.status(201).json(opportunity);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error Deleted Opportunity" });
        });
});

router.put("/:id", validateOpportunityID, updateEmail, (req, res) => {
    const id = req.params.id;
    Opportunities.update(id, req.body)
        .then(opportunity => {
            res.status(201).json(opportunity);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error Updating Opportunity" });
        });
});

router.post("/:id/image", imgUpload, function(req, res, next) {
    if (!req.file) {
        res.status(500).json({ message: "No File in Request" });
    } else {
        Users.imgUrl(req.body.url)
            .then(res => {
                res.status(201).json(req.body.url, req.body.message);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
});

router.get("/:id/image", (req, res) => {
    const id = req.params.id;
    res.sendFile(
        path.join(
            __dirname,
            `../public/opportunities/images/opportunitiesimg-${id}.jpg`
        )
    );
});

router.post("/:id/email", (req, res) => {
    const opportunitiyid = req.params.id;
    const email = req.body;
    req.body.opportunitiyid = requestid;
    Opportunities.insertEmail(req.body)
        .then(opportunitiesemail => {
            sgMail.setApiKey(secrets.sendgridkey);
            sgMail.send(email);
            res.status(200).json({ message: "Email Sent", opportunitiesemail });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error adding Email to Database" });
        });
});

router.get("/:id/email", (req, res) => {
    const id = req.params.id;
    Opportunities.getOpportunityEmail(id)

    .then(request => {
            res.status(200).json(request);
        })
        .catch(error => {
            console.log("error on GET /api/opportunities/email", error);
            res
                .status(500)
                .json({ error, message: "Cannot Retrieve Opportunity Email Data" });
        });
});

module.exports = router;