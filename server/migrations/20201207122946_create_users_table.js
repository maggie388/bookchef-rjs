const TABLE_NAME = 'users';

exports.up = (knex) => {
    return knex.schema.createTable(TABLE_NAME, table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable(TABLE_NAME);
};
