const express = require('express');
const router = express.Router();

const Recipes = require('../models/recipes');

router.get('/', (_req,res) => {
    Recipes
        .fetchAll()
        .then(recipes => {
            res.status(200).json(recipes);
        });
});

router.get('/:recipeId', (req, res) => {
    Recipes
        .where({ id: req.params.recipeId })
        .fetch()
        .then(recipe => {
            res.status(200).json(recipe);
        })
});

router.post('/', (req, res) => {
    new Recipes({
        user_id: req.body.userId,
        title: req.body.title,
        book: req.body.book,
        page: req.body.page,
        category: req.body.category,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        image: ''
    })
        .save()
        .then(newRecipe => {
            res.status(201).json({newRecipe});
        });
});

router.put('/:recipeId', (req, res) => {
    Recipes
        .where({ id: req.params.recipeId })
        .fetch()
        .then(recipe => {
            const { userId, title, book, page, category, ingredients, instructions, image } = req.body;
            recipe
                .save({
                    user_id: userId ? userId : recipe.user_id,
                    title: title ? title : recipe.title,
                    book: book ? book : recipe.book,
                    page: page ? page : recipe.page,
                    category: category ? category : recipe.category,
                    ingredients: ingredients ? ingredients : recipe.ingredients,
                    instructions: instructions ? instructions : recipe.instructions,
                    image: image ? image : recipe.image
                })
                .then(newRecipe => {
                    res.status(201).json(newRecipe)
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error))
});

module.exports = router;