const express = require('express');
const router = express.Router();
const authorize = require('../utils/authorize');

const Users = require('../models/users');
const Recipes = require('../models/recipes');

router.get('/', authorize, (req, res) => {
    const { query } = req.query;
    const rawQueryIngredients = query.split(' ').map(element => `ingredients LIKE '%${element}%'`).join(' AND ');
    const rawQueryTitle = query.split(' ').map(element => `title LIKE '%${element}%'`).join(' OR ');
    Users
        .where({ id: req.userId })
        .fetchAll({
            withRelated: [{
                recipes: function(qb) {
                    qb
                        .where(function() {
                            this.where('user_id', req.userId)
                            .andWhereRaw(rawQueryIngredients)
                            .orWhereRaw(rawQueryTitle)
                        })
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
