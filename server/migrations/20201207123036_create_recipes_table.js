const TABLE_NAME = 'recipes';

exports.up = (knex) => {
    return knex.schema.createTable(TABLE_NAME, table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('image')
        table.string('book').notNullable();
        table.string('page').notNullable();
        table.string('category').notNullable();
        table.json('ingredients').notNullable();
        table.json('instructions').notNullable();
        table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable(TABLE_NAME);
};
