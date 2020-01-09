const Employee = require('./Employee');

class Engineer extends Employee {

    constructor(name,title,email,github) {
        super(name,title,email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }

}

module.exports = Engineer;