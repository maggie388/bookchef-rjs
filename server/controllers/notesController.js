// MODEL FUNCTIONS
const notesModel = require('../models/notesModel');

// CONTROLLER FUNCTIONS
const postNewNote = async (req, res) => {
    const data = await notesModel.postNewNote(req);
    res.status(201).json({data});
}

const updateNote = async (req, res) => {
    const data = await notesModel.updateNote(req);
    res.status(201).json(data);
}

const deleteNote = async (req, res) => {
    await notesModel.deleteNote(req);
    res.status(204).send();
}

// EXPORTS
module.exports = {
    postNewNote,
    updateNote,
    deleteNote
}
