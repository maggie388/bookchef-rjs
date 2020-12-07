const express = require('express');
const app = express();
const uploadRouter = require('./routes/upload');
const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');

// OTHER PACKAGE IMPORTS
require('dotenv').config();

// MIDDLEWARE IMPORTS
const cors = require('cors');

// MIDDLEWARE FUNCTIONS
app.use(cors());
app.use(express.json());

// ROUTERS
app.use('/upload', uploadRouter);
app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);

// START LISTENING
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})