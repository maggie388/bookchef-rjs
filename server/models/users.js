const bookshelf = require('../bookshelf');

const Users = bookshelf.model('Users', {
    tableName: 'users',
    recipies: function() {
        return this.hasMany('Recipes');
    }
});

module.exports = Warehouse;