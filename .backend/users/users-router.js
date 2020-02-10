const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const Users = require("./users-model.js");
const validateUserID = require("./validateUserID.js");
router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
            console.log(users);
        })
        .catch(err => res.send(err));
});
router.get("/:id", validateUserID, (req, res) => {
    const id = req.params.id;
    Users.findById(id)
        .then(user => {
            console.log(user);
            res.json(user);
        })
        .catch(err => res.send(err));
});
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/users/images/");
    },
    filename: (req, file, cb) => {
        const id = req.params.id;
        var filetype = "";
        if (file.mimetype === "image/jpeg") {
            filetype = "jpg";
        }
        cb(null, "user-" + id + "." + filetype);
    }
});
var upload = multer({ storage: storage });
router.post(`/:id/image`, upload.single("file"), function(req, res, next) {
    const id = req.params.id;
    if (!req.file) {
        res.status(500);
        return next();
    }
    res.json({
        Url: `/api/users/${id}/image/` + req.file.filename
    });
});
router.get("/:id/image", (req, res) => {
    const id = req.params.id;
    res.sendFile(path.join(__dirname, `../public/users/images/user-${id}.jpg`));
});

module.exports = router;