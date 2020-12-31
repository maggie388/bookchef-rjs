const bookshelf = require('../bookshelf');

const User = bookshelf.model('User', {
    tableName: 'users',
    recipes: function() {
        return this.hasMany('Recipe');
    }
});

module.exports = User;