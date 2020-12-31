const express = require('express');
const router = express.Router();
const vision = require('@google-cloud/vision');
const fs = require('fs');


// MULTER CONFIG
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './uploads/temp')
    }, 
    filename: function (_req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// GOOGLE VISION API CONFIG
const client = new vision.ImageAnnotatorClient();

// doesn't pick up all fractions 
// try documentTextDetection https://cloud.google.com/vision/docs/pdf
router.post('/', upload.single('file'), async (req, res) => {
    const filename = req.file.filename;
    const [ result ] = await client.textDetection(`./uploads/temp/${filename}`);
    const detections = result.textAnnotations;
    // console.log('Text:');
    // console.log(detections[0].description);
    fs.unlink(`./uploads/temp/${filename}`, (error) => {
        if (!error) {
            console.log("File deleted!");
        }
    }) 
    res.status(200).send(detections[0].description);
});

module.exports = router;