
const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
//const fs = require('fs');
//const generatePage = require('./src/page-template.js');

//const pageHTML = generatePage(name, github);


//fs.writeFile('index.html', generatePage(name, github), err => {
//  if (err) throw err;

// console.log('Portfolio complete! Check out index.html to see the output!');
// });


function promptUser(portfolioData) {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter GitHub Username!')
                    return false;
                }

            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
}

const promptProject = portfolioData => {
    console.log(
        `=================
        Add a New Project
        =================`
    )

    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }


    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
        },
        {
            type: 'input',
            name: 'discription',
            message: 'Provide a discription of the project (Required)',
            validate: discriptionInput => {
                if (discriptionInput) {
                    return true
                } else {
                    console.log('Please enter discription!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'langauges',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascrpit', 'HTML', 'CSS', 'ES6', 'JQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to feature this project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter Github link!');
                    return false;
                }
            }
        },
        {
            type: 'confrim',
            name: 'Feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
};


promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });


