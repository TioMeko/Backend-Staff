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
} from "./lib/query.js";
import {
  getAllEmployees,
  getAllRoles
} from "./lib/utils.js"

const { roles, roles_id } = await getAllRoles();
const { employees, employees_id } = await getAllEmployees();

(async function init() {
  try {
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

    switch (data.choice) {
      case "View All Employees":
        await viewAllEmp();
        init();
        break;
      case "View All Departments":
        viewAllDep();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "Add Department":
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "Which department would you like to add?",
            },
          ])
          .then(async function (answer) {
            await addDepartment(answer.name);
            console.log(`${answer.name} has been added to departments.`);
          });
        break;

      case "Add Role":
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
              message:
                "Which department does the role belong to?",
              choices: roles
            },
          ])
          .then(async function (answer) {
            const roleId = roles_id[roles.indexOf(answer.role)];
            await addRole(answer.title, answer.salary, roleId);
            console.log(
              `${answer.title} has been added to department ${answer.role} with a salary of $${answer.salary}.`
            );
          });
        break;

      case "Add Employee":        
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
            const roleId = roles_id[roles.indexOf(answer.role)];
            let managerId = employees_id[employees.indexOf(answer.manager)]
            if (managerId === 0) managerId = null;
            await addEmp(answer.first_name, answer.last_name, roleId, managerId);
            console.log(
              `${answer.first_name} ${answer.last_name} has been added with the role of ${answer.role} under the manager ${answer.manager}`
            );
            connection.end();
          });
        break;

      case "Update Employee":
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee",
                message: "Which employee would you like to update?",
                choices: employees
              },
              {
                type: "list",
                name: "updateChoice",
                message: "What would you like to update?",
                choices: ["Update Role", "Update Manager"]
              }
            ])
            .then(async function (firstPrompt) {
              if (firstPrompt.updateChoice === "Update Role"){
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "role",
                      message: "Which role do you want to assign to the selected employee?",
                      choices: roles
                    }
                  ])
                  .then (async function (secondPrompt) {
                    const empId = employees_id[employees.indexOf(firstPrompt.employee)]
                    const roleId = roles_id[roles.indexOf(secondPrompt.role)];

                    await updateEmpRole(empId, roleId);
                    console.log(`${firstPrompt.employee} has been updated with the role of ${secondPrompt.role}`)
                    await connection.end();
                  })
                  
              }else if (answer.updateChoice === "Update Manager"){

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
