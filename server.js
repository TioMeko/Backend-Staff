// Import necessary modules and functions
import connection from "./lib/connection.js";
import inquirer from "inquirer";
import * as query from "./lib/query.js";
import {
  getAllDep,
  getAllEmployees,
  getAllRoles,
  getAllManagers,
} from "./lib/utils.js";

// Main function to initialize the program
(async function init() {
  try {
    const { roles, roles_id } = await getAllRoles();
    const { employees, employees_id } = await getAllEmployees();
    const { departments, departments_id } = await getAllDep();
    const { managers, managers_id } = await getAllManagers();

    // Prompt user for the desired action
    const data = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "View Employees By Manager",
          "View Employees By Department",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "Exit Program",
        ],
      },
    ]);

    // Perform actions based on the user's choice
    switch (data.choice) {
      case "View All Employees":
        await query.viewAllEmp();
        init();
        break;

      case "View All Departments":
        await query.viewAllDep();
        init();
        break;

      case "View All Roles":
        await query.viewAllRoles();
        init();
        break;

      case "Add Department":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "Which department would you like to add?",
            },
          ])
          .then(async function (answer) {
            await query.addDepartment(answer.name);
            console.log(`⭐ ${answer.name} has been added to departments. ⭐\n`);
          });
        await init();
        break;

      case "Add Role":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "What is the title of the role?",
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary for the new role?",
            },
            {
              type: "list",
              name: "department",
              message: "Which department does the role belong to?",
              choices: departments,
            },
          ])
          .then(async function (answer) {
            let depId = departments_id[departments.indexOf(answer.department)];
            await query.addRole(answer.title, answer.salary, depId);
            console.log(
              `⭐ ${answer.title} has been added to department ${answer.department} with a salary of $${answer.salary}. ⭐\n`
            );
          });
        await init();
        break;

      case "Add Employee":
        await inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the first name of the new employee?",
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the last name of the new employee?",
            },
            {
              type: "list",
              name: "role",
              message: "What title will the new employee have?",
              choices: roles,
            },
            {
              type: "list",
              name: "manager",
              message: "What manager will the new employee have?",
              choices: managers,
            },
          ])
          .then(async function (answer) {
            const roleId = roles_id[roles.indexOf(answer.role)];
            let managerId = managers_id[managers.indexOf(answer.manager)];
            if (managerId === 0) managerId = null;
            await query.addEmp(
              answer.first_name,
              answer.last_name,
              roleId,
              managerId
            );
            console.log(
              `⭐ ${answer.first_name} ${answer.last_name} has been added with the role of ${answer.role} under the manager ${answer.manager} ⭐\n`
            );
          });
        init();
        break;

      case "Update Employee":
        await inquirer
          .prompt([
            {
              type: "list",
              name: "employee",
              message: "Which employee would you like to update?",
              choices: employees,
            },
            {
              type: "list",
              name: "updateChoice",
              message: "What would you like to update?",
              choices: ["Update Role", "Update Manager"],
            },
          ])
          .then(async function (firstPrompt) {
            if (firstPrompt.updateChoice === "Update Role") {
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "role",
                    message:
                      "Which role do you want to assign to the selected employee?",
                    choices: roles,
                  },
                ])
                .then(async function (secondPrompt) {
                  const empId =
                    employees_id[employees.indexOf(firstPrompt.employee)];
                  const roleId = roles_id[roles.indexOf(secondPrompt.role)];

                  await query.updateEmpRole(empId, roleId);
                  console.log(
                    `⭐ ${firstPrompt.employee} has been updated with the role of ${secondPrompt.role} ⭐\n`
                  );
                  await init();
                });
            } else if (firstPrompt.updateChoice === "Update Manager") {
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message:
                      "Which manager do you want to assign to the selected employee?",
                    choices: employees,
                  },
                ])
                .then(async function (managerPrompt) {
                  const empId =
                    employees_id[employees.indexOf(firstPrompt.employee)];
                  let managerId =
                    employees_id[employees.indexOf(managerPrompt.manager)];
                  if (managerId === 0) managerId = null;

                  await query.updateEmpManager(empId, managerId);
                  console.log(
                    `⭐ ${firstPrompt.employee} has been updated with the manager ${managerPrompt.manager} ⭐\n`
                  );
                  await init();
                });
            }
          });

        break;

      case "View Employees By Manager":
        inquirer
          .prompt([
            {
              type: "list",
              name: "manager",
              message: "Which manager would you like to see the employees for?",
              choices: managers,
            },
          ])
          .then(async function (managerPrompt) {
            let managerId =
              managers_id[managers.indexOf(managerPrompt.manager)];
            await query.viewByManager(managerId);
            await init();
          });
        break;

      case "View Employees By Department":
        inquirer
          .prompt([
            {
              type: "list",
              name: "department",
              message:
                "Which department would you like to see the employees for?",
              choices: departments,
            },
          ])
          .then(async function (answer) {
            let depId = departments_id[departments.indexOf(answer.department)];
            await query.viewByDep(depId);
            await init();
          });
        break;

      case "Delete Department":
        inquirer
          .prompt([
            {
              type: "list",
              name: "department",
              message: "Which department would you like to delete?",
              choices: departments,
            },
            {
              type: "confirm",
              name: "confirm",
              message: `Are you sure you want to delete this department?`,
            },
          ])
          .then(async function (answer) {
            if (answer.confirm === true) {
              let depId = departments_id[departments.indexOf(answer.department)];
              await query.deleteDep(depId);
              console.log(`⭐ ${answer.department} has been deleted! ⭐\n`);
              await init();
            } else await init();
          });
        break;

      case "Delete Role":
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "Which role would you like to delete?",
              choices: roles,
            },
            {
              type: "confirm",
              name: "confirm",
              message: `Are you sure you want to delete this role?`,
            },
          ])
          .then(async function (answer) {
            if (answer.confirm === true) {
              let roleId = roles_id[roles.indexOf(answer.role)];
              await query.deleteRole(roleId);
              console.log(`⭐ ${answer.role} has been deleted! ⭐\n`);
              await init();
            } else await init();
          });
        break;

      case "Delete Employee":
        inquirer
          .prompt([
            {
              type: "list",
              name: "employee",
              message: "Which employee would you like to delete?",
              choices: employees,
            },
            {
              type: "confirm",
              name: "confirm",
              message: `Are you sure you want to delete this employee?`,
            },
          ])
          .then(async function (answer) {
            if (answer.confirm === true) {
              let empId = employees_id[employees.indexOf(answer.employee)];
              if (answer.employee === "None") await init();
              else {
                await query.deleteEmp(empId);
                console.log(`⭐ ${answer.employee} has been deleted! ⭐\n`);
                await init();
              }
            } else await init();
          });
        break;

      case "Exit Program":
        console.log("Goodbye!");
        connection.end();
        break;

      default:
        console.log("Invalid choice");
        await connection.end();
    }
  } catch (error) {
    console.log(error);
    await connection.end();
  }
})();
