const express = require('express');
const router = express.Router();
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

// MULTER CONFIG
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './uploads')
    }, 
    filename: function (_req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
    console.log(req.file.filename);
    res.status(200).send("success!");
});

module.exports = router;