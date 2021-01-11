const express = require('express');
const router = express.Router();
const authorize = require('../utils/authorize');

const Users = require('../models/users');
const Recipes = require('../models/recipes');

router.get('/', authorize, (req, res) => {
    const { query } = req.query;
    const ftsQuery = 'MATCH (title, ingredients) AGAINST (? IN BOOLEAN MODE)';
    Users
        .where({ id: req.userId })
        .fetchAll({
            withRelated: [{
                recipes: function(qb) {
                    if (query) {
                        qb.whereRaw(ftsQuery, query)
                    }
                }
            }]
        })
        .then(user => {
            const recipes = user.models[0].relations.recipes;
            res.status(200).json(recipes);
        })
        .catch(console.log); 
});

module.exports = router;
