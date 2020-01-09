const Employee = require('./Employee');

class Intern extends Employee {

    constructor(name,title,email,school) {
        super(name,title,email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }

}

module.exports = Intern;