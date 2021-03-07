const multer = require('multer');

const imageStorage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './uploads/images')
    }, 
    filename: function (_req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const tempStorage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './uploads/temp')
    }, 
    filename: function (_req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadImage = multer({ storage: imageStorage });
const tempUpload = multer({ storage: tempStorage })

module.exports = {
    uploadImage,
    tempUpload
}