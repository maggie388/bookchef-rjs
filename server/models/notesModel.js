// DATA
const Notes = require('../models/notes');

// MODEL FUNCTIONS
const postNewNote = (req) => {
    return new Notes({
        recipe_id: req.body.recipeId,
        text: req.body.text,
    })
        .save()
        .then(newNote => {
            return newNote
        })
        .catch(error => console.log(error));
}

const updateNote = (req) => {
    return Notes
        .where({ id: req.params.noteId })
        .fetch()
        .then(note => {
            const { text } = req.body;
            return note.save({ text: text ? text : note.text})
                .then(updatedNote => {
                    return updatedNote;
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}

const deleteNote = (req) => {
    return Notes
        .where({ id: req.params.noteId })
        .destroy()
        .then(() => {
            return;
        })
}

// EXPORTS
module.exports = {
    postNewNote,
    updateNote,
    deleteNote
}