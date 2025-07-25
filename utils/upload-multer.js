const path = require("path");
const multer = require("multer");
const uuid = require("uuid");

function getTargetImageStorage(address) {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./uploads/${address}`);
        },
        filename: function (req, file, cb) {
            const extention = path.parse(file.originalname).ext;
            const rendom_name = uuid.v4() + extention;
            cb(null, rendom_name);
        },
    });
}

const makeUploader = (address) => {
    const storage = getTargetImageStorage(address);
    return multer({storage: storage});
}
module.exports = makeUploader;
