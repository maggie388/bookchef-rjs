const express = require('express');
const router = express.Router();

const Notes = require('../models/notes');


// JWT AUTH CONFIG
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authorize(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'This endpoint requires Auth Header' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ error: 'This token is not valid' });
        } else {
            req.jwtDecoded = { ...decoded };
            req.userId = req.jwtDecoded.userId;
            next();
      }
    });
  }

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