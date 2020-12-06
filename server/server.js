const express = require('express');
const app = express();
const uploadRouter = require('./routes/upload');

// OTHER PACKAGE IMPORTS
require('dotenv').config();

// MIDDLEWARE IMPORTS
const cors = require('cors');

// MIDDLEWARE FUNCTIONS
app.use(cors());
app.use(express.json());

// ROUTERS
app.use('/upload', uploadRouter);

// START LISTENING
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})