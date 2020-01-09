const Manager = require('../lib/Manager');

describe("Manager", () => {

    describe("Initalization", () => {

        it("should have key 'officeNumber'", () => {
            var manager = new Manager("Todd","Manager","todd@todd.com","15");
            expect(manager.officeNumber).toEqual("15");
        });

    });

    describe("getOfficeNumber", () => {

        it("should return 'officeNumber' value as a string", () => {

            var manager = new Manager("Todd","Manager","todd@todd.com","15");
            expect(manager.getOfficeNumber()).toEqual("15");
            expect(typeof manager.getOfficeNumber()).toEqual("string");
        });

    });

    describe("getRole", () => {

        it("should return 'Manager'", () => {
            var manager = new Manager("Todd","Manager","todd@todd.com","UNC");
            expect(manager.getRole()).toEqual("Manager");
        });

    });

});