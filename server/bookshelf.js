const prodConfig = require('./knexfile').production;
const devConfig = require('./knexfile').development;

const knex = process.env.NODE_ENV === 'production'
    ? require('knex')(prodConfig)
    : require('knex')(devConfig);

const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;