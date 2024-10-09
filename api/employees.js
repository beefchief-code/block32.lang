//api file for employees
//make router
const express = require("express");
const router = express.Router();
module.exports = router;
//import data file
const employees = require("../data/employees");

//endpoints: GET employees, GET employee, POST employee, random, error

router.get("/", (req, res) => {
  res.json(employees);
});

router.post("/", (req, res, next) => {
  const { name } = req.body;
  if (name) {
    const newEmployee = { id: employees.length + 1, name };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
  } else {
    next({ status: 400, message: "employee must have name" });
  }
});
//random
router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    next({
      status: 404,
      message: `Employee #${id} does not exist in the system`,
    });
  }
});
