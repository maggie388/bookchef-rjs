const express = require('express');
const router = express.Router();
const fs = require('fs');
const authorize = require('../utils/authorize');
const mailer = require('../utils/mailer');
const { shareRecipe } = require('../utils/email');

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
router.get('/', authorize, (req, res) => {
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
        .fetch({ withRelated: ['notes'] })
        .then(recipe => {
            if (!recipe) {
                return res.status(404).json({error: 'Recipe Not Found.'})
            }
            res.status(200).json(recipe);
        })
        .catch(error => console.log(error));
});

router.post('/', authorize, upload.single('image'), (req, res) => {
    new Recipes({
        user_id: req.userId,
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

router.post('/:recipeId/share', authorize, (req, res) => {
    const userId = req.userId;
    const { recipeId } = req.params;
    const { email, notes: includeNotes } = req.body;
    Recipes
        .where({ id: recipeId, user_id: userId })
        .fetch({ withRelated: ['users', 'notes'] })
        .then(recipe => {
            const username = recipe.relations.users.attributes.name;
            const notes = includeNotes ? recipe.relations.notes.models : '';
            mailer({
                to: email,
                subject: `${username} Has Shared a Recipe With You!`,
                html: shareRecipe(username, recipe, notes)
            })
            res.status(200).json({ success: true });
        });
})

router.put('/:recipeId', authorize, upload.single('file'), (req, res) => {
    Recipes
        .where({ id: req.params.recipeId, user_id: req.userId })
        .fetch()
        .then(recipe => {
            const { userId, title, book, page, category, ingredients, instructions, image } = req.body;
            if (req.file) {
                fs.unlink(`./uploads/images/${recipe.attributes.image}`, (error) => {
                    if (!error) {
                        console.log("File deleted!");
                    }
                }) 
            }
            recipe
                .save({
                    user_id: userId ? userId : recipe.user_id,
                    title: title ? title : recipe.title,
                    book: book ? book : recipe.book,
                    page: page ? page : recipe.page,
                    category: category ? category : recipe.category,
                    ingredients: ingredients ? ingredients : recipe.ingredients,
                    instructions: instructions ? instructions : recipe.instructions,
                    image: req.file ? req.file.filename : image
                })
                .then(newRecipe => {
                    res.status(201).json(newRecipe)
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error))
});

router.delete('/:recipeId', authorize, (req, res) => {
    Recipes
        .where({ id: req.params.recipeId, user_id: req.userId })
        .fetch()
        .then(recipe => {
            fs.unlink(`./uploads/images/${recipe.attributes.image}`, (error) => {
                if (!error) {
                    console.log("Related Image File was Deleted!");
                }
            }) 
            recipe
                .destroy()
                .then(() => {
                    res.status(204).send();
                })
                .catch(error => console.log(error));
        });
});

module.exports = router;