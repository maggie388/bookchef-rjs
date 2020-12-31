const bookshelf = require('../bookshelf');

const Recipe = bookshelf.model('Recipe', {
    tableName: 'recipes',
    users: function() {
        return this.belongsTo('User');  
    }, 
    notes: function() {
        return this.hasMany('Note');
    }
});

module.exports = Recipe;