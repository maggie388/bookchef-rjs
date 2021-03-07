const router = require('express').Router();

// UTILS
const authorize = require('../utils/authorize');

// CONTROLLER FUNCTIONS
const notesController = require('../controllers/notesController');

// ROUTES
router.post('/', authorize, notesController.postNewNote);
router.put('/:noteId', authorize, notesController.updateNote);
router.delete('/:noteId', authorize, notesController.deleteNote);

// EXPORTS
module.exports = router;