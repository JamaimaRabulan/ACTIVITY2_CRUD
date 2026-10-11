
import { Sequelize } from "sequelize";
import { sequelize } from "./models/db.js";
import { Employee } from "./models/Employee.js";
import inquirer from "inquirer";

const rootSequelize = new Sequelize("mysql://root:@localhost:3306/");

const { createDb } = await inquirer.prompt([
  {
    type: "confirm",
    name: "createDb",
    message: "Database 'EmployeeCRUD' may not exist. Create it?",
    default: true,
  },
]);

if (createDb) {
  await rootSequelize.query("CREATE DATABASE IF NOT EXISTS EmployeeCRUD;");
  console.log("✅ Database created (if it did not exist)");
}

try {
  await sequelize.authenticate();
  console.log("✅ Connected to MySQL database!");
  await sequelize.sync();
  console.log("✅ Tables created for all models!");
} catch (err) {
  console.error("❌ Migration failed:", err);
} finally {
  process.exit();
}
