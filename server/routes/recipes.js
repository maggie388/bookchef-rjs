const express = require('express');
const router = express.Router();

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

// ROUTES
router.get('/', (_req,res) => {
    Recipes
        .fetchAll()
        .then(recipes => {
            res.status(200).json(recipes);
        })
        .catch(error => console.log(error));
});

router.get('/:recipeId', (req, res) => {
    Recipes
        .where({ id: req.params.recipeId })
        .fetch()
        .then(recipe => {
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