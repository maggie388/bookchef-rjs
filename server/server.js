const express = require('express');
const app = express();

const accountRouter = require('./routes/account');
const recipesRouter = require('./routes/recipes');
const notesRouter = require('./routes/notes');
const uploadRouter = require('./routes/upload');
const searchRouter = require('./routes/search');

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
app.use('/account', accountRouter);
app.use('/recipes', recipesRouter);
app.use('/notes', notesRouter);
app.use('/upload', uploadRouter);
app.use('/search', searchRouter);

app.use(express.static('uploads/images'));

// START LISTENING
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})