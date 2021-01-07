const express = require('express');
const router = express.Router();
const authorize = require('../utils/authorize');

const Notes = require('../models/notes');


// ROUTES
router.post('/', authorize, (req, res) => {
    new Notes({
        recipe_id: req.body.recipeId,
        text: req.body.text,
    })
        .save()
        .then(newNote => {
            res.status(201).json({newNote});
        })
        .catch(error => console.log(error));
});

router.put('/:noteId', authorize, (req, res) => {
    Notes
        .where({ id: req.params.noteId })
        .fetch()
        .then(note => {
            const { text } = req.body;
            return note.save({ text: text ? text : note.text})
                .then(updatedNote => {
                    res.status(201).json(updatedNote)
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error))
});

router.delete('/:noteId', authorize, (req, res) => {
    Notes
        .where({ id: req.params.noteId })
        .destroy()
        .then(() => {
            res.status(204).send();
        })
});

module.exports = router;