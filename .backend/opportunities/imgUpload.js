const multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/opportunities/images/");
    },
    filename: (req, file, cb) => {
        const id = req.params.id;
        var filetype = "";
        if (file.mimetype === "image/jpeg") {
            filetype = "jpg";
        }
        cb(null, "opportunitiesimg-" + id + "." + filetype);
    }
});
var upload = multer({ storage: storage });

function imgUpload(res, req, next) {
    const id = req.params.id;
    if (!req.file) {
        res.status(500).Json({ message: "No image file in request.body" });
        return next();
    } else {
        upload.single("file");
        req.body.json({
            url: `/api/opportunities/${id}/image/` + req.file.filename,
            message: "File Upload Success!"
        });
        next();
    }
}
module.exports = imgUpload;