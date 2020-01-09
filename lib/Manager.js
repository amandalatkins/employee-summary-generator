const Employee = require('./Employee');

class Manager extends Employee {

    constructor(name,title,email,officeNumber) {
        super(name,title,email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }

}

module.exports = Manager;