const router = require("express").Router();
const imgUpload = require("./imgUpload.js");
const Users = require("./users-model.js");
const validateUserID = require("./validateUserID.js");
router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});
router.get("/:id", validateUserID, (req, res) => {
    const { id } = req.params;
    Users.findById(id)
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});
router.get("/:id/image", validateUserID, (req, res) => {
    const id = req.params.id;
    res.sendFile(
        path.join(__dirname, `../public/users/images/usrpflimg-${id}.jpg`)
    );
});
router.post("/:id/image", validateUserID, imgUpload, (req, res) => {
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

module.exports = router;