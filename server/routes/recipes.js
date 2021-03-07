const router = require('express').Router();

// UTILS
const authorize = require('../utils/authorize');
const { uploadImage } = require('../utils/multer');

// CONTROLLER
const recipesController = require('../controllers/recipesController');

// ROUTES
router.get('/', authorize, recipesController.getUserRecipes);

router.get('/:recipeId', authorize, recipesController.getSingleRecipe);

router.post('/', authorize, uploadImage.single('image'), recipesController.postNewRecipe);

router.post('/:recipeId/share', authorize, recipesController.shareRecipeByEmail);

router.put('/:recipeId', authorize, uploadImage.single('file'), recipesController.updateRecipe);

router.delete('/:recipeId', authorize, recipesController.deleteRecipe);

// EXPORTS
module.exports = router;