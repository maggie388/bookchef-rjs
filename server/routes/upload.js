const router = require('express').Router();
const vision = require('@google-cloud/vision');
const fs = require('fs');

// UTILS
const authorize = require('../utils/authorize');
const { tempUpload } = require('../utils/multer');

// GOOGLE VISION API CONFIG
const client = new vision.ImageAnnotatorClient();

// API doesn't pick up all fractions 
// TO DO: try documentTextDetection https://cloud.google.com/vision/docs/pdf
router.post('/', authorize, tempUpload.single('file'), async (req, res) => {
    const filename = req.file.filename;
    const [ result ] = await client.textDetection(`./uploads/temp/${filename}`);
    const detections = result.textAnnotations;
    // console.log('Text:');
    // console.log(detections[0].description);
    fs.unlink(`./uploads/temp/${filename}`, (error) => {
        if (!error) {
            console.log("Temporaty file deleted!");
        }
    }) 
    res.status(200).send(detections[0].description);
});

module.exports = router;