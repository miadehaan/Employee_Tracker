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
                "Add Employee",
                "View departments, roles, employees",
                "Update employee roles"
            ]
        }
    ]).then( (resp) => {
        // swtich statement with functions on what to run next...
        console.log(resp.action);

        switch(resp.action) {
            case "Add Employee": 
                add();
                break;
            case "View departments, roles, employees":
                view()
                break;
            case "Update employee roles":
                update();
                break;

        }
    });

}

// Add new Employee
function add() {
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
        const values = [
            [answer.first_name], 
            [answer.last_name], 
            [parseInt(answer.role_id)], 
            [parseInt(answer.manager_id)]
        ];

        // store info to DB & add to 'employee' table
        var query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ?";
        connection.query(query, [values], function(err, res){
            if (err) throw err;
            console.log("new employee was added!");
        });

        // // Display the updated employee table
        // connection.query("SELECT * FROM employees", function(err, res){
        //     if (err) throw err;
        //     console.table(res);       
        // });
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
                cTable(res);

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
    


    // runMenu(); // Restart main menu
}