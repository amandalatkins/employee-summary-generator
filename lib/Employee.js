var lastId = 1;
class Employee {

    constructor(name,title,email) {
        this.name = name;
        this.title = title;
        this.email = email;
        this.id = lastId++;
    }

    getName() {
        return this.name;
    }

    getTitle() {
        return this.title;
    }

    getEmail() {
        return this.email;
    }

    getId() {
        return this.id;
    }

    getRole() {
        return "Employee";
    }

}


module.exports = Employee;