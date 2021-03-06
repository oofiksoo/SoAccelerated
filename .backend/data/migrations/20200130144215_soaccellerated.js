exports.up = function(knex) {
    return knex.schema
        .createTable("users", table => {
            table.increments();
            table.string("username").notNullable();
            table.string("password").notNullable();
            table.string("company").notNullable();
            table.string("email").notNullable();
        })

    .createTable("projects", table => {
        table.increments();
        table.string("project_name").notNullable();
        table.string("project_description");
        table
            .boolean("completed")
            .notNullable()
            .defaultTo(0);
    })

    .createTable("tasks", table => {
        table.increments();
        table.string("task_description").notNullable();
        table.string("task_notes");
        table
            .boolean("completed")
            .notNullable()
            .defaultTo(0);
        table
            .integer("project_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("projects")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    })

    .createTable("resources", table => {
        table.increments();
        table
            .string("resource_name")
            .notNullable()
            .unique();

        table.string("resource_description");
    })

    .createTable("projects_resources", table => {
        table.increments();

        table
            .integer("project_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("projects")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");

        table
            .integer("resource_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("resources")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema

        .dropTableIfExists("users")

    .dropTableIfExists("projects_resources")

    .dropTableIfExists("resources")

    .dropTableIfExists("tasks")

    .dropTableIfExists("projects");
};