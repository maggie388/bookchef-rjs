const express = require('express');
const router = express.Router();

const Users = require('../models/users');
const Recipes = require('../models/recipes');

// MULTER CONFIG
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './uploads/images')
    }, 
    filename: function (_req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


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


// ROUTES
router.get('/', authorize, (req, res) => {
    console.log('Line 46: ', req.userId);
    Recipes
        .where({ user_id: req.userId })
        .fetchAll()
        .then(recipes => {
            res.status(200).json(recipes);
        })
        .catch(error => console.log(error));
});

router.get('/:recipeId', authorize, (req, res) => {
    Recipes
        .where({ id: req.params.recipeId, user_id: req.userId })
        .fetch({ require: false })
        .then(recipe => {
            if (!recipe) {
                return res.status(404).json({error: 'Recipe Not Found.'})
            }
            res.status(200).json(recipe);
        })
        .catch(error => console.log(error));
});

router.post('/', upload.single('image'), (req, res) => {
    new Recipes({
        user_id: req.body.userId,
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
            res.status(201).json({newRecipe});
        })
        .catch(error => console.log(error));
});

router.put('/:recipeId', upload.single('image'), (req, res) => {
    Recipes
        .where({ id: req.params.recipeId })
        .fetch()
        .then(recipe => {
            const { userId, title, book, page, category, ingredients, instructions } = req.body;
            recipe
                .save({
                    user_id: userId ? userId : recipe.user_id,
                    title: title ? title : recipe.title,
                    book: book ? book : recipe.book,
                    page: page ? page : recipe.page,
                    category: category ? category : recipe.category,
                    ingredients: ingredients ? ingredients : recipe.ingredients,
                    instructions: instructions ? instructions : recipe.instructions,
                    image: req.file ? req.file.filename : recipe.image
                })
                .then(newRecipe => {
                    res.status(201).json(newRecipe)
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error))
});

router.delete('/:recipeId', (req, res) => {
    Recipes
        .where({ id: req.params.recipeId })
        .destroy()
        .then(() => {
            res.status(204).send();
        })
        .catch(error => console.log(error));
});

module.exports = router;