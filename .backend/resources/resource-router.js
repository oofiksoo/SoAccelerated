const express = require("express");

const Resources = require("./resource-model.js.js");

const router = express.Router();

router.get("/", (req, res) => {
    Resources.get()

    .then(resources => {
        res.status(200).json(resources);
    })

    .catch(err => {
        res.status(500).json({ message: "Could not retrieve resources" });
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    Resources.getById(id)

    .then(resource => {
        if (!resource) {
            res.status(404).json({ message: "Invalid ID" });
        } else {
            res.status(200).json(resource);
        }
    })

    .catch(err => {
        res.status(500).json({ message: "Could not retrieve resources" });
    });
});

router.post("/", (req, res) => {
    const resource = req.body;

    Resources.add(resource)

    .then(count => {
        res.status(201).json(count);
    })

    .catch(err => {
        res.status(500).json({ message: "Could not add resources" });
    });
});

module.exports = router;