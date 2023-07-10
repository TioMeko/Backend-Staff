import connection from "./lib/connection.js";
import inquirer from "inquirer";
import utils from "./lib/queries.js";

(async () => {
  try {
    const data = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Department",
          "Exit Program",
        ],
      },
    ]);

    switch (data.choice) {
      case "View All Employees":
        utils.viewAllEmp();
        break;
      case "View All Departments":
        utils.viewAllDep();
        break;
      case "View All Roles":
        utils.viewAllRoles();
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
            await utils.addDepartment(answer.name);
            console.log(`${answer.name} has been added to departments.`);
            await connection.end();
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
