var mysql = require("mysql");
var inquirer = require("inquirer");

// Create MySQL connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Webdev_2020!!",
    database: "employees_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    run();
});

// run inquirer
function run() {
    inquirer
    .prompt([
        {
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                // write out options here
                "Add departments, roles, employees",
                "View departments, roles, employees",
                "Update employee roles",
                "Update employee managers",
                " View employees by manager",
                "Delete departments, roles, and employees",
                "View the total utilized budget of a department -- ie the combined salaries of all employees in that department",
                "exit"
            ]
        }
    ]).then( (resp) => {
        // swtich statement with functions on what to run next...
        console.log(resp.action);
    });

}