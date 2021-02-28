const {Model} = require('objection');

class Course extends Model{
    static getTableName(){
        return 'course'
    }
    getId(){
        return this.id;
    }
}
module.exports = Course;