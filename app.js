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

//Test Data
// const team = {
//     manager: new Manager("Amanda","The Manager","amanda@example.com",123),
//     engineers: [new Engineer("Roger","Senior Engineer","roger@example.com","rogerdev")],
//     interns: [new Intern("Lil Johnny","Assistant","johnny@example.com","UNC")]
// }

var managerTemplate;
var engineerTemplate;
var internTemplate;
var mainTemplate;

init();

function init() {
    loadTemplates();
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

    var html = "";

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

    html += populateTemplate(false, managerTemplate, team.manager);

    team.engineers.forEach(item => {
        html += populateTemplate(false, engineerTemplate, item);
    });

    team.interns.forEach(item => {
        html += populateTemplate(false, internTemplate, item);
    });

    html = populateTemplate(true, mainTemplate, html);

    var filename = sanitizeFilename(teamName);

    fs.writeFile("./output/"+filename+".html",html,(err) => {
        if (err) throw err;
        console.log(`Your ${teamName} summary file has been created!`);
    });

}

function sanitizeFilename(filename) {
    var allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
    return filename.split('').map(item => {
        if(allowed.indexOf(item.toLowerCase()) === -1) {
            return '';
        } else {
            return item.toLowerCase();
        }
    }).join('');
}

function populateTemplate(main, html, details) {
    var templateReplacements = [];
    if (!main) {
        templateReplacements = [
            {
                find: "zzzEmployeeNamezzz",
                replace: details.getName()
            },
            {
                find: "zzzEmployeeRolezzz",
                replace: details.getRole()
            },
            {
                find: "zzzEmployeeTitlezzz",
                replace: details.getTitle()
            },
            {
                find: "zzzEmployeeIdzzz",
                replace: details.getId()
            },
            {
                find: "zzzEmployeeEmailzzz",
                replace: details.getEmail()
            }
        ]

        if (details.getRole() === "Manager") {
            templateReplacements.push({
                find: "zzzEmployeeOfficezzz",
                replace: details.getOfficeNumber()
            });
        } else if (details.getRole() === "Engineer") {
            templateReplacements.push({
                find: "zzzEmployeeGithubzzz",
                replace: details.getGithub()
            });
        } else if (details.getRole() === "Intern") {
            templateReplacements.push({
                find: "zzzEmployeeSchoolzzz",
                replace: details.getSchool()
            });
        }
    } else {
        templateReplacements = [{
            find: "zzzTeamNamezzz",
            replace: teamName
        },{
            find: "zzzTeamSummaryzzz",
            replace: details
        }]
    }

    templateReplacements.forEach(filter => {
        var regex = new RegExp(filter.find, "g");
        html = html.replace(regex, filter.replace);
    });

    return html;

}

function loadTemplates() {
    fs.readFile("templates/manager.html", "utf8", (err,data) => {
        if (err) return console.log(err);
        managerTemplate = data;
    });

    fs.readFile("templates/engineer.html","utf8", (err,data) => {
        if (err) return console.log(err);
        engineerTemplate = data;
    });

    fs.readFile("templates/intern.html","utf8", (err,data) => {
        if (err) return console.log(err);
        internTemplate = data;
    });

    fs.readFile("templates/main.html","utf8",(err,data) => {
        if (err) return console.log(err);
        mainTemplate = data;
    });
}