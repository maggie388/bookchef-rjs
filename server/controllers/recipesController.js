// UTILS
const mailer = require('../utils/mailer');
const { shareRecipe } = require('../utils/email');

// MODEL FUNCTIONS
const recipesModel = require('../models/recipesModel');

// CONTROLLER FUNCTIONS
const getUserRecipes = async (req, res) => {
    const data = await recipesModel.getUserRecipes(req.userId);
    res.status(200).json(data);
}

const getSingleRecipe = async (req, res) => {
    const data = await recipesModel.getSingleRecipe(req.params.recipeId, req.userId);
    if (!data) {
        return res.status(404).json({error: 'Recipe Not Found.'})
    }
    res.status(200).json(data);
}

const postNewRecipe = async (req, res) => {
    const data = await recipesModel.postNewRecipe(req);
    res.status(201).json({data});
}

const shareRecipeByEmail = async (req, res) => {
    const data = await recipesModel.shareRecipeByEmail(req);
    const { email, notes: includeNotes } = req.body;
    const username = data.relations.users.attributes.name;
    const notes = includeNotes ? data.relations.notes.models : '';
    mailer({
        to: email,
        subject: `${username} Has Shared a Recipe With You!`,
        html: shareRecipe(username, data, notes)
    })
    res.status(200).json({ success: true });
}

const updateRecipe = async (req, res) => {
    const data = await recipesModel.updateRecipe(req);
    res.status(201).json(data);
}

const deleteRecipe = async (req, res) => {
    await recipesModel.deleteRecipe(req.params.recipeId, req.userId);
    res.status(204).send();

}

// EXPORTS
module.exports = {
    getUserRecipes, 
    getSingleRecipe,
    postNewRecipe, 
    shareRecipeByEmail, 
    updateRecipe, 
    deleteRecipe
}