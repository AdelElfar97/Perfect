const express = require("express");
const router = express.Router();
const isAuth = require("../MW/auth");

const studentController = require("../controllers/studentController");
const { body, query, param } = require("express-validator");

module.exports = router;

router.post("/students",isAuth, studentController.createStudent);
router.get("/students",isAuth, studentController.getStudents);
router.get("/students/:id", isAuth, studentController.getStudent);
router.delete("/students/:id", isAuth,studentController.deleteStudent);
router.put("/students/:id", isAuth,studentController.updateStudent);

  module.exports = router;