const TABLE_NAME = 'notes';

exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, table => {
        table.increments('id').primary();
        table.string('text').notNullable();
        table
            .integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
