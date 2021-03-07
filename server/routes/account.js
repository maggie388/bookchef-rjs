const router = require('express').Router();

// UTILS
const authorize = require('../utils/authorize');

// CONTROLLER FUNCTIONS
const usersController = require('../controllers/usersController');

// ROUTES
router.post('/register', usersController.handleUserRegistration)
router.post('/activate/:activeToken', usersController.handleAccountActivation)
router.post('/login', usersController.handleUserLogin);
// TO DO: connect this route with profile page when built
router.get('/:userId', authorize, (req, res) => {
    res.status(200).send('Get account by user ID request received');
})

// EXPORTS
module.exports = router;