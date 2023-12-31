import connection from "./connection.js";
import dotenv from "dotenv";
import consoleTable from "console.table";

async function viewAllEmp() {
  const query = `
    SELECT 
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title AS job_title,
    department.name AS department,
    role.salary as salary,    
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    FROM 
    employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id;
    `;

  const [rows, fields] = await connection.execute(query);
  console.table(rows);
}

async function viewAllDep() {
  const query = `
      SELECT
      department.id,
      department.name as department_name
      FROM
      department;
      `;

  const [rows, fields] = await connection.execute(query);
  console.table(rows);
}

async function viewAllRoles() {
  const query = `
        SELECT
        role.id,
        role.title,
        role.salary,
        department.name AS department
        FROM
        role
        JOIN department ON role.department_id = department.id
        `;

  const [rows, fields] = await connection.execute(query);
  console.table(rows);
}

async function addDepartment(name) {
  const query = `
    INSERT INTO department (name)
      VALUES
      ("${name}")
  `;

  const [rows, fields] = await connection.execute(query);
}

async function addRole(title, salary, department_id) {
  const query = `
  INSERT INTO role (title, salary, department_id)
    VALUES
      ("${title}", ${salary}, ${department_id})
  `;

  const [rows, fields] = await connection.execute(query);
}

async function addEmp(first_name, last_name, role_id, manager_id) {
  const query = `
  INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
      ("${first_name}", "${last_name}", ${role_id}, ${manager_id})
  `;

  const [rows, fields] = await connection.execute(query);
}

async function updateEmpRole(employee_id, role_id) {
  const query = `
    UPDATE employee
    SET role_id = ${role_id}
    WHERE id = ${employee_id}
  `;

  const [rows, fields] = await connection.execute(query);
}

async function updateEmpManager(employee_id, manager_id) {
  const query = `
    UPDATE employee
    SET manager_id = ${manager_id}
    WHERE id = ${employee_id}
  `;

  const [rows, fields] = await connection.execute(query);
}

async function viewByManager(manager_id) {
  const query = `
    SELECT e.id, e.first_name, e.last_name,
    role.title AS job_title
    FROM employee AS e
    JOIN role ON e.role_id = role.id
    WHERE e.manager_id = ${manager_id};
  `;

  const [rows, fields] = await connection.execute(query);
  if (rows.length === 0) console.log("⭐ This employee is not a manager. ⭐\n");
  else console.table(rows);
}

async function viewByDep(department_id) {
  const query = `
  SELECT e.first_name, e.last_name, r.title AS role, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
    WHERE d.id = ${department_id}
    ORDER BY d.name;
  `;

  const [rows, fields] = await connection.execute(query);
  if (rows.length === 0)
    console.log("⭐ This department has no employees. ⭐\n");
  else console.table(rows);
}

async function deleteDep(department_id) {
  const query = `
  DELETE FROM department WHERE id = ${department_id};
  `;

  const [rows, fields] = await connection.execute(query);
}

async function deleteRole(role_id) {
  const query = `
  DELETE FROM role WHERE id = ${role_id};
  `;

  const [rows, fields] = await connection.execute(query);
}

async function deleteEmp(employee_id) {
  const query = `
  DELETE FROM employee WHERE id = ${employee_id};
  `;

  const [rows, fields] = await connection.execute(query);
}

export {
  viewAllEmp,
  viewAllDep,
  viewAllRoles,
  addDepartment,
  addRole,
  addEmp,
  updateEmpRole,
  updateEmpManager,
  viewByManager,
  viewByDep,
  deleteDep,
  deleteRole,
  deleteEmp,
};
