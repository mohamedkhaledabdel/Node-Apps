
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const logger = require('./Middleware/logger');
//Middleware for fetching the json inside a post requests and set the req.body to the request body 
router.use(express.json());
//Middleware for logging. Implementation  is in the logger.js
router.use(logger);
//Create an instance of the debug function exported from the debugger.js 
const debug = require('./Middleware/debugger')

//fetching a get request from client with specified route
// router.get('/', (req, res) =>{
//     var courses = coursesRepository.getCourses();
//     res.send(courses);
//     debug('app::coursesData', courses)
// });

//Fetch a course based on ID from list of
// router.get('/:id', (req, res) =>{
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if(!course){
//         return res.status(404).send('The course with given ID is not found');
//     }
//     res.send(course);
// });

function validateSchemaOfCourseDataEnteredByUser(requestBody) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        lecturer: Joi.string().min(3).required()
    });
    result = schema.validate(requestBody);
    return result;
}

//Fetching a post request and create json object from req.body and push object to list of courses
// router.post('/', (req, res) => {
//     //The following lines uses the Joi classes to create a schema that validates user input
//     result = validateSchemaOfCourseDataEnteredByUser(req.body);
//     debug('app:coursesAPI',result);
//     if(result.error){
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name,
//         lecturer: req.body.lecturer
//     };
//     courses.push(course);
//     res.send(course);
// });

//Fetching put request to update a course by it's ID
router.put('/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    result = validateSchemaOfCourseDataEnteredByUser(req.body);
    debug('app::coursesAPI',result)
    if(!course){
        return res.status(400).send('No course found with the specified ID');
    }
    if(result.error) {
        return res.status(400).send('Invalid details entry')
    }
    course.name = req.body.name;
    course.lecturer = req.body.lecturer;
    res.send(courses);
});

function getCourseByID(id) {
    var course = courses.find(c => c.id === parseInt(id));
    return course;
}

router.delete('/:id', (req, res) => {
    var course = getCourseByID(req.params.id); 
    if(!course){
        return res.status(400).send("No course found with the specified ID");
    }
    const courseIndex = courses.indexOf(course);
    courses.splice(courseIndex,1);
    res.send(courses);
});

const courseRepository = require('./src/DataAccessLayer/CoursesRepository.js');
router.get('/', async (req, res) => {
    var courses = await courseRepository.getCoursesThroughModel();
    debug('app::coursesAPI', courses)
    res.send(courses);
})

router.get('/:id', async (req, res) =>{
    const course = await courseRepository.getCourseByIdThroughModel(parseInt(req.params.id));
    if(!course){
        return res.status(404).send('The course with given ID is not found');
    }
    res.send(course);
});

router.post('/', (req, res) => {
    //The following lines uses the Joi classes to create a schema that validates user input
    result = validateSchemaOfCourseDataEnteredByUser(req.body);
    debug('app:coursesAPI',result);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        name: req.body.name,
        lecturer: req.body.lecturer
    };
    courseRepository.insert(course);
    res.send(course)
});


module.exports = router;