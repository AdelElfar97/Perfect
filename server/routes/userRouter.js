const express = require("express");
const router = express.Router();
const isAuth = require("../MW/auth");

const userController = require("../controllers/userController");
const { body, query, param } = require("express-validator");

module.exports = router;

//Get Users
router.get("/users", isAuth, userController.getUsers);
//Get User
router.get("/users/:id", isAuth, userController.getUser);
//Delete User 
router.delete("/users/:id",isAuth, userController.deleteUser);
//Update User
router.put("/users/:id",isAuth, userController.updateUser);

  module.exports = router;