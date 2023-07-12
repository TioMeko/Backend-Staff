import connection from "./connection.js";

// Get all information from role so the user can pick a role
const getAllRoles = async () => {
  let roles = [];
  let roles_id = [];

  await connection.query(`SELECT * FROM role`).then(([rows, fields]) => {
    for (let i = 0; i < rows.length; i++) {
      roles.push(rows[i].title);
      roles_id.push(rows[i].id);
    }
  });

  return { roles, roles_id };
};

const getAllDep = async () => {
  let departments = [];
  let departments_id = [];

  await connection.query(`SELECT * FROM department`).then(([rows, fields]) => {
    for (let i = 0; i < rows.length; i++) {
      departments.push(rows[i].name);
      departments_id.push(rows[i].id);
    }
  });

  return { departments, departments_id };
};

// Get all information from employee so the user can pick an employee
const getAllEmployees = async () => {
  let employees = [];
  let employees_id = [];

  await connection.query(`SELECT * FROM employee`).then(([rows, fields]) => {
    for (let i = 0; i < rows.length; i++) {
      employees.push(`${rows[i].first_name} ${rows[i].last_name}`);
      employees_id.push(rows[i].id);
    }
    employees.push("None");
    employees_id.push(0);
  });

  return { employees, employees_id };
};

const getAllManagers = async () => {
  let managers = [];
  let managers_id = [];

  await connection
    .query(
      `SELECT * FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee)`
    )
    .then(([rows, fields]) => {
      for (let i = 0; i < rows.length; i++) {
        managers.push(`${rows[i].first_name} ${rows[i].last_name}`);
        managers_id.push(rows[i].id);
      }
    });

  return { managers, managers_id };
};

export { getAllRoles, getAllEmployees, getAllDep, getAllManagers };
