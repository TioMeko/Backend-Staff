import connection from "./lib/connection.js";
import inquirer from 'inquirer';
import utils from "./lib/utils.js";

connection.connect((error) => {
  if(error) throw error;
  console.log('Connected to MySQL server.')
})

inquirer
  .prompt([
  {
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: ["View All Employees", "Choice 2", "Choice 3", "quit"],
  },
])
.then((data) => {
  console.log(data.choice);
    switch (data.choice){
        case "View All Employees":
                utils.viewAllEmp(connection);
                break;
        default:
        console.log("Invalid choice");
    }
})
.catch((error) => {
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
  } else {
    console.log(error);
  }
});
