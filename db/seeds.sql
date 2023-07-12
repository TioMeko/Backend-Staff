INSERT INTO department (name)
    VALUES 
        ("IT"),
        ("Finance & Accounting"),
        ("Marketing"),
        ("UX/UI"),
        ("Human Resources"),
        ("Board of Directors");

INSERT INTO role (title, salary, department_id)
    VALUES
        ("Full Stack Developer", 100000, 1),
        ("Systems Analyst", 115000, 1),
        ("Financial Advisor", 153000, 2),
        ("Accountant", 71000, 2),
        ("Web Marketing Specialist", 75000, 3),
        ("Content Marketing Producer", 90000, 3),
        ("Frontend Developer", 93000, 4 ),
        ("Graphic Designer", 56000, 4),
        ("Staffing Manager", 51000, 5),
        ("HR Analyst", 62000, 5),
        ("Director of Operations", 270000, 6),
        ("Director of Finance", 210000, 6),
        ("IT Director", 220000, 6);

INSERT INTO employee (first_name, last_name, role_id)
    VALUES
        ("Paul", "Carapace", 13), -- IT Director
        ("Meko", "Appleseed", 11), -- Director of Operations
        ("Monkey", "Artas", 12), -- Director of Finance
        ("Johnny", "Tsunami", 1),
        ("Captain", "Hook", 2),
        ("Buzz", "Lightyear", 3),
        ("Ben", "Pencili", 4),
        ("John", "Doe", 5),
        ("Jane", "Smith", 6),
        ("Michael", "Johnson", 7),
        ("Emily", "Williams", 8),
        ("David", "Brown", 9),
        ("Sarah", "Davis", 10);

UPDATE employee
    SET manager_id = (
        CASE
            WHEN role_id = 2 THEN 1
            WHEN role_id = 1 THEN 1
            WHEN role_id = 3 THEN 3
            WHEN role_id = 4 THEN 3
            WHEN role_id = 5 THEN 1
            WHEN role_id = 6 THEN 1
            WHEN role_id = 7 THEN 1
            WHEN role_id = 8 THEN 1
            WHEN role_id = 9 THEN 2
            WHEN role_id = 10 THEN 2
        END
    );
