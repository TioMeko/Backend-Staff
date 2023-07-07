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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
        ("Paul", "Carapace", 13, 2), -- IT Director
        ("Meko", "Appleseed", 11, NULL), -- Director of Operations
        ("Monkey", "Artas", 12, 2), -- Director of Finance
        ("Johnny", "Tsunami", 2, 1),
        ("Captain", "Hook", 1, 1),
        ("Buzz", "Lightyear", 3, 3),
        ("Ben", "Pencili", 4, 3),
        ("John", "Doe", 5, 1),
        ("Jane", "Smith", 6, 1),
        ("Michael", "Johnson", 7, 1),
        ("Emily", "Williams", 8, 1),
        ("David", "Brown", 9, 2),
        ("Sarah", "Davis", 10, 2);
