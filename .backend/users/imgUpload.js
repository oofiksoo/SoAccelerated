const multer = require("multer");

function imgUpload(res, req, next) {
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
            cb(null, "usrpflimg-" + id + "." + filetype);
        }
    });
    var upload = multer({ storage: storage });
    const id = req.params.id;
    console.log(req.params.id);
    upload.single("file");
    res.body.json({
        url: `/api/users/${id}/image/` + req.file.filename,
        message: "File Upload Success!"
    });
    next();
}

module.exports = imgUpload;