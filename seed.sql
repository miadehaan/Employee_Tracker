-- Intially populate the database with data
USE employees_DB;

-- Populate 'departments' table
INSERT INTO DEPARTMENTS (NAME) VALUES ("ACCOUNTING");
INSERT INTO DEPARTMENTS (NAME) VALUES ("ENGINEERING");
INSERT INTO DEPARTMENTS (NAME) VALUES ("SALES");

-- Populate 'roles' table
INSERT INTO ROLES (TITLE, SALARY, DEPARTMENT_ID) VALUES ("ACCOUNTANT", 80000, 1);
INSERT INTO ROLES (TITLE, SALARY, DEPARTMENT_ID) VALUES ("SOFTWARE ENGINEER", 100000, 2);
INSERT INTO ROLES (TITLE, SALARY, DEPARTMENT_ID) VALUES ("SALES ASSOCIATE", 60000, 3);

-- Populate 'employees' table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Zella', 'Smith', 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jay', 'Abrigo', 3, 1);