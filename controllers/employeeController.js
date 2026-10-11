import { Employee } from "../models/Employee.js";

const employee = {
    //CREATE
    insert: async (req, res) => {
        try {
            const { FirstName, LastName, MiddleName, Position, Department, Salary } = req.body;
            const newEmployee = await Employee.create({
                FirstName,
                LastName,
                MiddleName: MiddleName || null,
                Position,
                Department,
                Salary
            });

            res.status(201).json({
                message: "Employee created successfully",
                employee: newEmployee
            });
        } catch (error) {
            res.status(400).json({
                message: "Failed to create employee",
                error: error.message
            });
        }
    },

    //READ ALL
    index: async (req, res) => {
        try {
            const employees = await Employee.findAll();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve employees",
                error: error.message
            });
        }
    },

    //READ ONE
    show: async (req, res) => {
        try {
            const foundEmployee = await Employee.findByPk(req.params.id);

            if (!foundEmployee) {
                return res.status(404).json({
                    message: "Employee not found"
                });
            }

            res.status(200).json(foundEmployee);
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve employee",
                error: error.message
            });
        }
    },

    //UPDATE
    update: async (req, res) => {
        try {
            const foundEmployee = await Employee.findByPk(req.params.id);

            if (!foundEmployee) {
                return res.status(404).json({
                    message: "Employee not found"
                });
            }

            await foundEmployee.update(req.body);

            res.status(200).json({
                message: "Employee updated successfully",
                employee: foundEmployee
            });
        } catch (error) {
            res.status(400).json({
                message: "Failed to update employee",
                error: error.message
            });
        }
    },

    //DELETE
    delete: async (req, res) => {
        try {
            const foundEmployee = await Employee.findByPk(req.params.id);

            if (!foundEmployee) {
                return res.status(404).json({
                    message: "Employee not found"
                });
            }

            await foundEmployee.destroy();

            res.status(200).json({
                message: "Employee deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete employee",
                error: error.message
            });
        }
    }
};

export { employee };