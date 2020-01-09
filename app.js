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
var managerTemplate;
var engineerTemplate;
var internTemplate;
var mainTemplate;

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

    var html = mainTemplateStart();

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

    html += loadTemplate("Manager",team.manager);

    team.engineers.forEach(item => {
        html += loadTemplate("Engineer",item);
    });

    team.interns.forEach(item => {
        html += loadTemplate("Intern",item);
    });

    html += mainTemplateEnd();

    var filename = sanitizeFilename(teamName);

    fs.writeFile("./output/"+filename+".html",html,(err) => {
        if (err) throw err;
        console.log(`Your ${teamName} summary file has been created!`);
    });

}

function sanitizeFilename(filename) {
    var letters = "abcdefghijklmnopqrstuvwxyz";
    return filename.split('').map(item => {
        if(letters.indexOf(item.toLowerCase()) === -1) {
            return '';
        } else {
            return item.toLowerCase();
        }
    }).join('');
}

function loadTemplate(type, details) {
    if (type === "Manager") {
        return `<div class="col-md-6 col-lg-4">
        <div class="card team-member manager">
            <div class="card-body">
                <div class="text-center text-white">
                    <i class="fas fa-user-tie member-icon"></i>
                    <h3 class="card-title">${details.getName()}</h3>
                    <p class="card-text">${details.getRole()} &bull; ${details.getTitle()}</p>
                </div>
              <ul class="list-group">
                <li class="list-group-item"><i class="fas fa-envelope"></i><a href="mailto:${details.getEmail()}">${details.getEmail()}</a></li>
                <li class="list-group-item"><i class="fas fa-fingerprint"></i>ID: ${details.getId()}</li>
                <li class="list-group-item"><i class="fas fa-door-open"></i>Office: ${details.getOfficeNumber()}</li>
              </ul>
            </div>
          </div>
    </div>`;
    } else if (type === "Engineer") {
        return `<div class="col-md-6 col-lg-4">
        <div class="card team-member engineer">
            <div class="card-body">
                <div class="text-center text-white">
                    <i class="fas fa-code member-icon"></i>
                    <h3 class="card-title">${details.getName()}</h3>
                    <p class="card-text">${details.getRole()} &bull; ${details.getTitle()}</p>
                </div>
                <ul class="list-group">
                    <li class="list-group-item"><i class="fas fa-envelope"></i><a href="mailto:${details.getEmail()}">${details.getEmail()}</a></li>
                    <li class="list-group-item"><i class="fas fa-fingerprint"></i>ID: ${details.getId()}</li>
                    <li class="list-group-item"><i class="fab fa-github"></i><a href="https://github.com/${details.getGithub()}">${details.getGithub()}</a></li>
                </ul>
            </div>
          </div>
    </div>`;
    } else if (type === "Intern") {
        return `<div class="col-md-6 col-lg-4">
        <div class="card team-member intern">
            <div class="card-body">
                <div class="text-center text-white">
                    <i class="fas fa-user-graduate member-icon"></i>
                    <h3 class="card-title">${details.getName()}</h3>
                    <p class="card-text">${details.getRole()} &bull; ${details.getTitle()}</p>
                </div>
                <ul class="list-group">
                    <li class="list-group-item"><i class="fas fa-envelope"></i><a href="mailto:${details.getEmail()}">${details.getEmail()}</a></li>
                    <li class="list-group-item"><i class="fas fa-fingerprint"></i>ID: ${details.getId()}</li>
                    <li class="list-group-item"><i class="fas fa-university"></i>${details.getSchool()}</li>
                </ul>
            </div>
          </div>
    </div>`;
    }
}

function mainTemplateStart() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${teamName} Profile</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/d9b905f9e6.js" crossorigin="anonymous"></script>
        <style>
        
            .team-member .list-group-item img {
                width: 23px;
                height: auto;
                margin-right: 8px;
                margin-top: -1px;
            }
    
            .team-member {
                border:none;
                margin-bottom: 2rem;
            }
    
            .team-member .member-icon {
                margin-bottom: 1rem;
                font-size: 80px;
            }
            .team-member .list-group {
                margin-top: 1em;
            }
            .team-member .list-group-item i {
                margin-right: 5px;
            }
    
            .team-member.manager {
                background-color: #f03e3e;
            }
            .team-member.manager a { 
                color: #f03e3e;
            }
    
            .team-member.engineer {
                background-color: #228be6;
            }
    
            .team-member.engineer a {
                color: #228be6;
            }
    
            .team-member.intern {
                background-color: #40c057;
            }
    
            .team-member.intern a {
                color:#40c057;
            }
        </style>
    </head>
    <body>
        <div class="jumbotron">
            <div class="container">
                <h1 class="display-4 text-center">${teamName}</h1>
            </div>
        </div>
        <div class="container">
    
            <div class="row">`;
}

function mainTemplateEnd() {
    return `</div>

    </div>

</body>
</html>`;
}