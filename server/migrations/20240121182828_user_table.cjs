const tableName = 'user';

exports.up = function (knex) {

    return knex.schema.hasTable(tableName)
        .then(tableExists => {
            if (tableExists) {
                return;
            }

            return knex.schema.createTable('users', (table) => {
                table.increments('id').unsigned().primary().notNull();
                table.string('email').notNull();
                table.string('username').notNull();
                table.string('password').notNull();
                table.string('display_name').notNull();

                table.unique(['email', 'username', 'display_name']);
            });
        });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(tableName)
};
