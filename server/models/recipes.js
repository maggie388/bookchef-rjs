const bookshelf = require('../bookshelf');

const Inventory = bookshelf.model('Inventory', {
    tableName: 'recipes',
    users: function() {
        return this.belongsTo('Users');
    }
});

module.exports = Inventory;