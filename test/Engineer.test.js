const Engineer = require('../lib/Engineer');

describe("Engineer", () => {

    describe("Initalization", () => {

        it("should have key 'github'", () => {
            var engineer = new Engineer("Todd","Engineer","todd@todd.com","toddengineer");
            expect(engineer.github).toEqual("toddengineer");
        });

    });

    describe("getGithub", () => {

        it("should return 'github' value as a string", () => {

            var engineer = new Engineer("Todd","Engineer","todd@todd.com","toddengineer");
            expect(engineer.getGithub()).toEqual("toddengineer");
            expect(typeof engineer.getGithub()).toEqual("string");
        });

    });

    describe("getRole", () => {

        it("should return 'Engineer'", () => {
            var engineer = new Engineer("Todd","Engineer","todd@todd.com","toddengineer");
            expect(engineer.getRole()).toEqual("Engineer");
        });

    });

});