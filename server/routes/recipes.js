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
        ingredients: JSON.stringify(req.body.ingredients),
        instructions: JSON.stringify(req.body.instructions),
        image: ''
    })
        .save()
        .then(newRecipe => {
            res.status(201).json({newRecipe});
        });
});

module.exports = router;