const express = require('express');
const router = express.Router();
const authorize = require('../utils/authorize');

const Users = require('../models/users');
const Recipes = require('../models/recipes');

router.get('/', authorize, (req, res) => {
    const { query } = req.query;
    // objective: add wildcard operator (*) to end of each word to pick up some singular and plural versions of same word and partial words
    // convert to lowercase to pick up both lowercase and uppercase 's' in the replace methods that follow
    // remove '*' character from input (this is a wildcard in FTS BOOLEAN MODE)
    // remove an 's' when at the end of word
    // replace an 's followed by a space' with just a space
    // replace a 'space between words' with '* '
    const parsedQuery = query.toLowerCase().replace(/\*/g, '').replace(/s$/g, '').replace(/s\s/g, ' ').replace(/\b\s\b/g, '* ');
    const ftsQuery = 'MATCH (title, ingredients) AGAINST (? IN BOOLEAN MODE)';
    Users
        .where({ id: req.userId })
        .fetchAll({
            withRelated: [{
                recipes: function(qb) {
                    if (query) {
                        console.log(`${parsedQuery}*`);
                        qb.whereRaw(ftsQuery, `${parsedQuery}*`);
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
