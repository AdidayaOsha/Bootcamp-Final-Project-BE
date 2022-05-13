const db = require("../db");
const multer = require("multer");
const path = require("path");

const storage_product_image = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const storage_payment_proof = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images-proof");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload_product_image = multer({
  storage: storage_product_image,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|JPEG|JPG|PNG|GIF/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("product_image");

const upload_payment_proof = multer({
  storage: storage_payment_proof,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|JPEG|JPG|PNG|GIF/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("payment_proof");

module.exports = {
  upload_payment_proof,
  upload_product_image,
};
