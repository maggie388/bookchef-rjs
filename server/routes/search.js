const express = require('express');
const router = express.Router();
const authorize = require('../utils/authorize');

const Users = require('../models/users');

router.get('/', authorize, (req, res) => {
    const { query } = req.query;
    Users
        .where({ id: req.userId })
        .fetchAll({
            withRelated: [{
                recipes: function(qb) {
                    qb
                        .where('title', 'LIKE', `%${query}%`)
                        .orWhere('ingredients', 'LIKE', `%${query}%`)
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
