const db = require("../db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  //destination: where you want to store that images.
  destination: (req, file, cb) => {
    // null: no error, file name (should be unique so we use date.now), path: img + ext
    cb(null, "images");
  },
  // what the name of the image would be
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  // 10Mb max
  limits: { fileSize: "10000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|JPEG|JPG|PNG|GIF/;
    // validate if the file type is correct with mimetype
    const mimeType = fileTypes.test(file.mimetype);

    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper file format to upload!");
  },
  //.single will name the field as product_image in the client side
}).single("product_image");
// if you want to upload multiple images use .array('product_images', 3) // 3 photos

module.exports = upload;
