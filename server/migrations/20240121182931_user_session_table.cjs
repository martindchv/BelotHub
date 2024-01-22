const tableName = 'user_session';

exports.up = function (knex) {

    return knex.schema.hasTable(tableName)
        .then(tableExists => {
            if (tableExists) {
                return;
            }

            return knex.schema.createTable('user_session', function(table) {
                table.string('user_id').unsigned().primary().notNull();
                table.string('session_id').notNull();
                table.string('session_token').notNull();
                table.string('socket_token').notNull();
                table.dateTime('expire_date').notNull();
            })
        });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(tableName)
};
