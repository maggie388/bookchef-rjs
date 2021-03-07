// UTILS 
const fs = require('fs');

// DATA
const Recipes = require('../models/recipes');

// MODEL FUNCTIONS
const getUserRecipes = (userId) => {
    return Recipes
        .where({ user_id: userId })
        .fetchAll()
        .then(recipes => {
            return recipes;
        })
        .catch(error => console.log(error));
}

const getSingleRecipe = (recipeId, userId) => {
    return Recipes
        .where({ id: recipeId, user_id: userId })
        .fetch({ withRelated: ['notes'] })
        .then(recipe => {
            return recipe;
        })
        .catch(error => console.log(error));
}

const postNewRecipe = (req) => {
    return new Recipes({
        user_id: req.userId,
        title: req.body.title,
        book: req.body.book,
        page: req.body.page,
        category: req.body.category,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        image: req.file ? req.file.filename : ''
    })
        .save()
        .then(newRecipe => {
            return newRecipe;
        })
        .catch(error => console.log(error));
}

const shareRecipeByEmail = (req) => {
    const userId = req.userId;
    const { recipeId } = req.params;
    return Recipes
        .where({ id: recipeId, user_id: userId })
        .fetch({ withRelated: ['users', 'notes'] })
        .then(recipe => {
            return recipe;
        });
}

const updateRecipe = (req) => {
    return Recipes
    .where({ id: req.params.recipeId, user_id: req.userId })
    .fetch()
    .then(recipe => {
        const { userId, title, book, page, category, ingredients, instructions, image } = req.body;
        if (req.file) {
            fs.unlink(`./uploads/images/${recipe.attributes.image}`, (error) => {
                // FIX: If an image is replaced, the old one doesn't get deleted
                if (!error) {
                    console.log("File deleted!");
                }
            }) 
        }
        recipe
            .save({
                user_id: userId ? userId : recipe.user_id,
                title: title ? title : recipe.title,
                book: book ? book : recipe.book,
                page: page ? page : recipe.page,
                category: category ? category : recipe.category,
                ingredients: ingredients ? ingredients : recipe.ingredients,
                instructions: instructions ? instructions : recipe.instructions,
                image: req.file ? req.file.filename : image
            })
            .then(newRecipe => {
                return newRecipe;
            })
            .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

const deleteRecipe = (recipeId, userId) => {
    return Recipes
        .where({ id: recipeId, user_id: userId })
        .fetch()
        .then(recipe => {
            fs.unlink(`./uploads/images/${recipe.attributes.image}`, (error) => {
                if (!error) {
                    console.log("Related Image File was Deleted!");
                }
            }) 
            recipe
                .destroy()
                .then(() => {
                    return;
                })
                .catch(error => console.log(error));
        });
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