const express = require('express');
const app = express()
const debug = require('./Middleware/debugger')
const setupDb = require('./db-setup')
setupDb();
//Make it listen to port 3000 on localhost if process.env.PORT is not set
//process.env.PORT is the dynaic port set at the deployed server
const port = process.env.PORT || 3000;
app.listen(port);

//Middleware for securing http requests
const helmet = require('helmet');
app.use(helmet())

//If condition enables the middlewares only if we are in the development env.
const morgan = require('morgan');
if(app.get('env') === 'development') {
    console.log(app.get('env'))
    console.log(process.env.DEBUG)
    app.use(morgan('tiny'))
}

const courses  = require('./CoursesAPI')
app.use('/api/courses', courses)