const Opportunities = require("./opportunities-model.js");

function validateOpportunityID(req, res, next) {
    const id = req.params.id;
    Opportunities.getById(id)
        .then(opportunity => {
            if (!opportunity) {
                res.status(400).json({ message: "Invalid Opportunity id." });
            } else {
                req.opportunity = opportunity;
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error retrieving opportunity id." });
        });
}

module.exports = {
    validateOpportunityID
};