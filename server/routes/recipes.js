const express = require('express');
const router = express.Router();

const Recipes = require('../models/recipes');

router.get('/', (req,res) => {
    Recipes
        .fetchAll()
        .then(recipes => {
            res.status(200).json(recipes);
        });
});

module.exports = router;