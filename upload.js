const util = require("util");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    // const match = ["image/png", "image/jpeg"];

    // if (match.indexOf(file.mimetype) === -1) {
    //   var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
    //   return callback(message, null);
    // }

    //var filename = `${Date.now()}-bezkoder-${file.originalname}`;
    console.log("file ori ", file.originalname);
    callback(null, file.originalname);
  }
});

var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;