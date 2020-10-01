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
    // run the inquirer function
});