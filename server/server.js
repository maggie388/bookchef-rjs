const express = require('express');
const app = express();

// OTHER PACKAGE IMPORTS
require('dotenv').config();
const path = require('path');

// ROUTERS
const accountRouter = require('./routes/account');
const recipesRouter = require('./routes/recipes');
const notesRouter = require('./routes/notes');
const uploadRouter = require('./routes/upload');
const searchRouter = require('./routes/search');

// MIDDLEWARE
const cors = require('cors');
const logger = require('morgan');

// cors support
app.use(cors());

// init middleware
app.use(logger('dev'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTERS
app.use('/account', accountRouter);
app.use('/recipes', recipesRouter);
app.use('/notes', notesRouter);
app.use('/upload', uploadRouter);
app.use('/search', searchRouter);

app.use(express.static('uploads/images'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));

    app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    }); 
}

// START LISTENING
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})