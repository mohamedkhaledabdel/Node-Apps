const chai = require('chai')
const expect = chai.expect
var assert = require('chai').assert

const coursesRepository = require('../src/DataAccessLayer/CoursesRepository.js')

var courses = [
    {id: 1, name: 'CSEN101', lecturer: 'Slim'},
    {id: 2, name: 'CSEN1000', lecturer: 'Haythem'},
    {id: 3, name: 'CSEN800', lecturer: 'Amr'}

];

describe("Courses repository unit tests", () => {
	it("should return an array of courses", ()=> {
        expect(coursesRepository.getCourses()).to.be.a('array')

    })
    
	it("Returned courses should be equal the courses array", ()=> {
        expect(coursesRepository.getCourses()).to.be.eql(courses)
	})
})




