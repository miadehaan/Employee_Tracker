var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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
    runMenu();
});

// run inquirer
function runMenu() {
    inquirer
    .prompt([
        {
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                // write out menu options here
                "Add department, role, or employee",
                "View departments, roles, or employees",
                "Update employee roles"
            ]
        }
    ]).then( (resp) => {
        // swtich statement with functions on what to run next...
        console.log(resp.action);

        switch(resp.action) {
            case "Add department, role, or employee": 
                add();
                break;
            case "View departments, roles, or employees":
                view()
                break;
            case "Update employee roles":
                update();
                break;

        }
    });

}

// Add new department, role, or employee
function add() {
    inquirer.prompt([
        {
            name: "addType",
            type: "rawlist",
            choices: [
                "add new department",
                "add new role",
                "add new employee"
            ],
            message: "Select which table you would like to add to:"
        }
    ]).then( (resp) => {
        if (resp.addType === "add new department") {
            addDepartment();
        }
        else if (resp.addType === "add new role") {
            addRole();
        }
        else if (resp.addType === "add new employee") {
            addEmployee();
        }
        
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the new department name?"
        }
    ]).then(function(answer){
        // store info to DB & add to 'employee' table
        var query = "INSERT INTO departments SET ?";
        connection.query(query, {name: answer.department}, function(err, res){
            if (err) throw err;
        });

        //Display only the employee table:
        connection.query("SELECT * FROM departments", function(err, res) {
            if (err) throw err;
            // Display the employee table
            console.table(res);
            runMenu(); // Restart main menu
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of this new role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What's the salary for this new role'?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What's the department's id #?"
        }
    ]).then(function(answer){
        const values = {
            title: answer.title, 
            salary: parseFloat(answer.salary), // change to decimal # / float?
            department_id: parseInt(answer.department_id)
        };

        // store info to DB & add to 'employee' table
        var query = "INSERT INTO roles SET ?";
        connection.query(query, values, function(err, res){
            if (err) throw err;
        });

        //Display only the employee table:
        connection.query("SELECT * FROM roles", function(err, res) {
            if (err) throw err;
            // Display the employee table
            console.table(res);
            runMenu(); // Restart main menu
        });
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What's the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What's the employee's last name?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What's the employee's role id #?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What's the employee's manager id #?"
        }
    ]).then(function(answer){
        const values = {
            first_name: answer.first_name, 
            last_name: answer.last_name, 
            role_id: parseInt(answer.role_id), 
            manager_id: parseInt(answer.manager_id)
        };

        // store info to DB & add to 'employee' table
        var query = "INSERT INTO employees SET ?";
        connection.query(query, values, function(err, res){
            if (err) throw err;
            console.log("new employee was added!");
        });

        //Display only the employee table:
        connection.query("SELECT * FROM employees", function(err, res) {
            if (err) throw err;
            // Display the employee table
            console.table(res);
            runMenu(); // Restart main menu
        });
    });
}


// View departments, roles, employees
function view() {
    inquirer.prompt([
        {
            name: "tableType",
            type: "list",
            choices: [
                "departments",
                "roles",
                "employees"
            ],
            message: "Select which table you would like to view:"
        }
    ]).then(function(resp){
        if (resp.tableType === "departments") {
            //Display only the employee table:
            var query = "SELECT * FROM departments";

            connection.query(query, function(err, res) {
                if (err) throw err;
                // Display the employee table
                // console.table(res);
                console.table(res);
                runMenu(); // Restart main menu
            });
        }
        else if (resp.tableType === "roles"){
            //Display only the employee table:
            var query = "SELECT * FROM roles";

            connection.query(query, function(err, res) {
                if (err) throw err;
                // Display the employee table
                console.table(res);
                runMenu(); // Restart main menu
            });
        }
        else if (resp.tableType === "employees") {
            //Display only the employee table:
            var query = "SELECT * FROM employees";

            connection.query(query, function(err, res) {
                if (err) throw err;
                // Display the employee table
                console.table(res);
                runMenu(); // Restart main menu
            });
        }

    });


}


// Update employee roles
function update() {
    // ask user employee id and role id
    inquirer.prompt([
        {
            name: "role_id",
            type: "input",
            message: "Please provide the new role id #:"
        },
        {
            name: "employee_id",
            type: "input",
            message: "Please provide the employee id # that you would like to update:"
        },
    ]).then(function(resp){
        var values = [
            {
                role_id: resp.role_id
            },
            {
                id: resp.employee_id
            }
        ]
        var query = "UPDATE employees SET ? WHERE ?";
        connection.query(query, values, function(err, res) {
            if (err) throw err;
            // console.log("The effect rows within the table is: " + res.affectedRows);
            runMenu(); // Restart main menu
        });
    });


    
}