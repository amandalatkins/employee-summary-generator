const Intern = require('../lib/Intern');

describe("Intern", () => {

    describe("Initalization", () => {

        it("should have key 'school'", () => {
            var intern = new Intern("Todd","Intern","todd@todd.com","UNC");
            expect(intern.school).toEqual("UNC");
        });

    });

    describe("getSchool", () => {

        it("should return 'school' value as a string", () => {

            var intern = new Intern("Todd","Intern","todd@todd.com","UNC");
            expect(intern.getSchool()).toEqual("UNC");
            expect(typeof intern.getSchool()).toEqual("string");
        });

    });

    describe("getRole", () => {

        it("should return 'Intern'", () => {
            var intern = new Intern("Todd","Intern","todd@todd.com","UNC");
            expect(intern.getRole()).toEqual("Intern");
        });

    });

});