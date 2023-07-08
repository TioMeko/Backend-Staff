import connection from "../lib/connection.js";

async function viewAllEmp(db) {
    const query = `
        SELECT * FROM employee;
        `;

        connection.query(query, (err, rows) => {
            if (err) throw err;
            console.table(rows);
            promptUser();
          });
}

async function addEmployee(db) {
    let roles = [];
    let roles_id = [];
    await db.query(`SELECT * FROM role`)
        .then(([rows, fields]) => {
            for (let i = 0; i < rows.length; i++) {
                roles.push(rows[i].title);
                roles_id.push(rows[i].id);
            }
        })
        .catch(console.log)
    // Managers
    let managers = [];
    let managers_id = [];
    await db.query(`SELECT * FROM employee`)
        .then(([rows, fields]) => {
            for (let i = 0; i < rows.length; i++) {
                managers.push(rows[i].first_name + " " + rows[i].last_name);
                managers_id.push(rows[i].id);
            }
            managers.push("None");
            managers_id.push(0);
        })
        .catch(console.log)


    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
                validate: function (input) {
                    if (input.length < 1) {
                        console.log("Please input fist name: ");
                        return false;
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
                validate: function (input) {
                    if (input.length < 1) {
                        console.log("Please input last name: ");
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is employee role?',
                choices: roles,
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the employeess manager?',
                choices: managers,
            },
        ])
        .then(data => {
            let query = ``;

            let manager_id = managers_id[managers.indexOf(data.manager)];

            if (manager_id == 0) {
                query = `
                INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES ("${data.first_name}", "${data.last_name}", ${roles_id[roles.indexOf(data.role)]}, NULL)
                `;
            } else {
                query = `
                INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES ("${data.first_name}", "${data.last_name}", ${roles_id[roles.indexOf(data.role)]}, ${manager_id})
                `;
            }

            db.query(query)
                .then(() => {
                    console.log(`Employee: ${data.first_name} ${data.last_name} has been added!`)
                })
                .catch(console.log)
                .then(() => init(db));
        });
}

export default { viewAllEmp, addEmployee };