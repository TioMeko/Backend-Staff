// Import necessary modules and functions
import connection from "./lib/connection.js";
import inquirer from "inquirer";
import {
  viewAllEmp,
  viewAllDep,
  viewAllRoles,
  addDepartment,
  addRole,
  addEmp,
  updateEmpRole,
  updateEmpManager,
} from "./lib/query.js";
import { getAllEmployees, getAllRoles } from "./lib/utils.js";

// Get all roles and employees data
const { roles, roles_id } = await getAllRoles();
const { employees, employees_id } = await getAllEmployees();

// Main function to initialize the program
(async function init() {
  try {
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
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee",
          "Exit Program",
        ],
      },
    ]);

    // Perform actions based on user's choice
    switch (data.choice) {
      case "View All Employees":
        await viewAllEmp();
        init();
        break;
      case "View All Departments":
        await viewAllDep();
        init();
        break;
      case "View All Roles":
        await viewAllRoles();
        init();
        break;
      case "Add Department":
        // Prompt user to enter new department name
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "Which department would you like to add?",
            },
          ])
          .then(async function (answer) {
            // Add the new department
            await addDepartment(answer.name);
            console.log(
              `⭐ ${answer.name} has been added to departments. ⭐\n`
            );
          });
        await init();
        break;

      case "Add Role":
        // Prompt user to enter new role details
        inquirer
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
              name: "role",
              message: "Which department does the role belong to?",
              choices: roles,
            },
          ])
          .then(async function (answer) {
            // Get the ID of the selected role
            const roleId = roles_id[roles.indexOf(answer.role)];
            // Add the new role
            await addRole(answer.title, answer.salary, roleId);
            console.log(
              `⭐ ${answer.title} has been added to department ${answer.role} with a salary of $${answer.salary}. ⭐\n`
            );
          });
        await init();
        break;

      case "Add Employee":
        // Prompt user to enter new employee details
        inquirer
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
              choices: employees,
            },
          ])
          .then(async function (answer) {
            // Get the ID of the selected role and manager
            const roleId = roles_id[roles.indexOf(answer.role)];
            let managerId = employees_id[employees.indexOf(answer.manager)];
            if (managerId === 0) managerId = null;
            // Add the new employee
            await addEmp(
              answer.first_name,
              answer.last_name,
              roleId,
              managerId
            );
            console.log(
              `⭐ ${answer.first_name} ${answer.last_name} has been added with the role of ${answer.role} under the manager ${answer.manager} ⭐\n`
            );
            connection.end();
          });
        await init();
        break;

      case "Update Employee":
        // Prompt user to select an employee and update choice
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
              // Prompt user to select a new role for the employee
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
                  // Get the IDs of the employee and selected role
                  const empId =
                    employees_id[employees.indexOf(firstPrompt.employee)];
                  const roleId = roles_id[roles.indexOf(secondPrompt.role)];

                  // Update the employee's role
                  await updateEmpRole(empId, roleId);
                  console.log(
                    `⭐ ${firstPrompt.employee} has been updated with the role of ${secondPrompt.role} ⭐\n`
                  );
                  await connection.end();
                  await init();
                });
            } else if (firstPrompt.updateChoice === "Update Manager") {
              // Prompt user to select a new manager for the employee
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
                  // Get the IDs of the employee and selected manager
                  const empId =
                    employees_id[employees.indexOf(firstPrompt.employee)];
                  let managerId =
                    employees_id[employees.indexOf(managerPrompt.manager)];
                  if (managerId === 0) managerId = null;

                  // Update the employee's manager
                  await updateEmpManager(empId, managerId);
                  console.log(
                    `⭐ ${firstPrompt.employee} has been updated with the manager ${managerPrompt.manager} ⭐\n`
                  );
                  await connection.end();
                  await init();
                });
            }
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
