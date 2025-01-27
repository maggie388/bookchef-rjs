const TABLE_NAME = 'recipes';

exports.up = (knex) => {
    return knex.schema.createTable(TABLE_NAME, table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('image')
        table.string('book').notNullable();
        table.string('page').notNullable();
        table.string('category').notNullable();
        table.text('ingredients', 'longtext').notNullable();
        table.text('instructions', 'longtext').notNullable();
        table
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .raw('ALTER TABLE recipes ADD FULLTEXT (title, ingredients)');
};

exports.down = (knex) => {
    return knex.schema.dropTable(TABLE_NAME);
};
