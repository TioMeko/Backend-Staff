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

export { getAllRoles, getAllEmployees };