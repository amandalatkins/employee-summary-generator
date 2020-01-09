// Include class files
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// Include node modules
const fs = require('fs');
const inquirer = require('inquirer');

// Declare global variables
var teamName;
const team = {manager: {}, engineers: [], interns: []};

init();

function init() {
    askTeamName();
}

function askTeamName() {
    inquirer.prompt([
        {
            type: 'prompt',
            name: 'name',
            message: 'What is your team\'s name?'
        }
    ]).then(answers => { 
        teamName = answers.name; 
        askAddNewEmployee(); 
    });
}

function askAddNewEmployee() {

    var choices = ["Manager","Engineer","Intern","Done"];

    if (team.manager.name) {
        choices = choices.splice(1);
    }

    inquirer.prompt([
        {
            type: "list",
            message: "Add an employee",
            name: 'employeeType',
            choices: choices
        }
    ]).then(answers => {
        if (answers.employeeType === "Done") {
            renderTeamHTML();
        } else {
            askForDetails(answers.employeeType);
        }
    });
}

function askForDetails(type) {

    let questions = [
        {
            type: "prompt",
            name: "name",
            message: `Enter ${type}'s name: `
        },
        {
            type: "prompt",
            name: "title",
            message: `Enter ${type}'s title: `
        },
        {
            type: "prompt",
            name: "email",
            message: `Enter ${type}'s email: `
        },
    ];

    if (type === "Manager") {
        questions.push( {
            type: "prompt",
            name: "other",
            message: `Enter ${type}'s office number: `
        });
    } else if (type === "Engineer") {
        questions.push( {
            type: "prompt",
            name: "other",
            message: `Enter ${type}'s GitHub username: `
        });
    } else if (type === "Intern") {
        questions.push( {
            type: "prompt",
            name: "other",
            message: `Enter ${type}'s school: `
        });
    }

    inquirer.prompt(questions).then(answers => createEmployee(answers, type));

} 

function createEmployee(answers, type) {

    if (type === "Manager") {
        let manager = new Manager(answers.name,answers.title,answers.email,answers.other);
        team.manager = manager;
    } else if (type === "Intern") {
        let intern = new Intern(answers.name,answers.title,answers.email,answers.other);
        team.interns.push(intern);
    } else if (type === "Engineer") {
        let engineer = new Engineer(answers.name,answers.title,answers.email,answers.other);
        team.engineers.push(engineer);
    }

    console.log(`Added ${type} ${answers.name} to ${teamName}`);

    askAddNewEmployee();
    
}

function renderTeamHTML() {
    if (!team.manager.name) {
        console.log("Must have a Manager.");
        return askAddNewEmployee();
    }
    if (team.interns.length === 0) {
        console.log("Must have at least one intern.");
        return askAddNewEmployee();
    }
    if (team.engineers.length === 0) {
        console.log("Must have at least one intern");
        return askAddNewEmployee();
    }
    console.log(team);

}