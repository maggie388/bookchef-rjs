const express = require('express');
const router = express.Router();

const Recipes = require('../models/recipes');
const Users = require('../models/users');

// JWT AUTH CONFIG
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authorize(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'This endpoint requires Auth Header' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ error: 'This token is not valid' });
        } else {
            req.jwtDecoded = { ...decoded };
            req.userId = req.jwtDecoded.userId;
            next();
      }
    });
}

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
