const bookshelf = require('../bookshelf');

const Note = bookshelf.model('Note', {
    tableName: 'notes',
    recipes: function() {
        return this.belongsTo('Recipe');  
    }
});

module.exports = Note;