
exports.up = function(knex) {
  return knex.schema.createTable('course', (table) =>{
      table.increments();
      table.string('name').notNullable();
      table.string('lecturer').notNullable();
  }).createTable('student', (table)=>{
      table.increments();
      table.string('name').notNullable();
      table.string('faculty').notNullable();
      table.string('major').notNullable();
      table.float('gpa').notNullable();
      table.string('email').notNullable().unique();

  })
};

exports.down = function(knex) {
    return knew.schema.dropTableIfExists('course').dropTableIfExists('student');
};
