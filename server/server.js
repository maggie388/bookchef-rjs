const express = require('express');
const app = express();

const loginRouter = require('./routes/login');
const recipesRouter = require('./routes/recipes');
const uploadRouter = require('./routes/upload');

// OTHER PACKAGE IMPORTS
require('dotenv').config();

// MIDDLEWARE IMPORTS
const cors = require('cors');
const logger = require('morgan');

// MIDDLEWARE FUNCTIONS
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// ROUTERS
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use('/upload', uploadRouter);

app.use(express.static('uploads/images'));

// START LISTENING
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})