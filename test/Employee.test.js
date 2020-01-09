const Employee = require('../lib/Employee');

describe("Employee", () => {

    describe("Initalization", () => {

        it ("should have three keys: name, id, title, email", () => {

            var employee = new Employee("Todd","Manager","todd@todd.com");

            expect(employee).toEqual({name: "Todd", title: "Manager", id: 1, email: "todd@todd.com"});

        });
        
        it("should assign ids sequentially", () => {
            var employee = new Employee("Eric","Intern","eric@example.com");
            var employee2 = new Employee("Todd","Manager", "todd@todd.com");
            expect(employee2.id).toEqual(employee.id+1);
        });

    });

    describe("getName", () => {
        it("should return the 'name' value as a string", () => {
            var employee = new Employee("Todd","Manager","todd@todd.com");
            expect(employee.getName()).toEqual("Todd");
            expect(typeof employee.getName()).toEqual("string");
        });
    });

    describe("getTitle", () => {
        it("should return the 'title' value as a string", () => {
            var employee = new Employee("Todd","Manager","todd@todd.com");
            expect(employee.getTitle()).toEqual("Manager");
            expect(typeof employee.getTitle()).toEqual("string");
        });
    });

    describe("getId", () => {
        it("should return the 'id' value as a number", () => {
            var employee = new Employee("Todd","Manager","todd@todd.com");
            expect(employee.getId()).toEqual(employee.id);
            expect(typeof employee.getId()).toEqual("number");
        });
    });

    describe("getEmail", () => {
        it("should return the 'email' value as a string", () => {
            var employee = new Employee("Todd","Manager","todd@todd.com");
            expect(employee.getEmail()).toEqual("todd@todd.com");
            expect(typeof employee.getEmail()).toEqual("string");
        });
    });

    describe("getRole", () => {
        it("should return the role value as a string", () => {
            var employee = new Employee("Todd","Manager","todd@todd.com");
            expect(employee.getRole()).toEqual("Employee");
            expect(typeof employee.getRole()).toEqual("string");
        });
    });

});