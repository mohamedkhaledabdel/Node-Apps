var coursesModel = require('./models/Course.js');

module.exports.getCourses = function (){
    return courses;
}

module.exports.getCoursesThroughModel = async function () {
    var courses = await coursesModel.query();
    return courses;
}

module.exports.getCourseByIdThroughModel = async function (id) {
    var course = await coursesModel.query().findById(id);
    console.log(course.name);
    return course;
}

module.exports.insert = async function (course) {
    const newCourse = await coursesModel.query().insert({
        name: course.name,
        lecturer: course.lecturer
      });
}


  