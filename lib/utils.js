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

// Get all information from employee so the user can pick a manager
const getAllEmployees = async () => {
    let managers = [];
    let managers_id = [];

  await connection.query(`SELECT * FROM employee`).then(([rows, fields]) => {
    for (let i = 0; i < rows.length; i++) {
      managers.push(`${rows[i].first_name} ${rows[i].last_name}`);
      managers_id.push(rows[i].role_id);
    }
    managers.push("None");
    managers_id.push(0);
  });

  return { managers, managers_id };

};

export { getAllRoles, getAllEmployees };