const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const { body, query, param } = require("express-validator");
const isAuth = require("../MW/auth");

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("username is not valid"),
    body("password").notEmpty().withMessage("password should not be empty"),
  ],
  controller.userLogin
);



router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("username is not valid"),
    body("password").notEmpty().withMessage("password should not be empty"),
    body("confirmpassword")
      .custom((value, { req }) => {
        return value == req.body.password;
      })
      .withMessage("confirmpassword doesn't match"),
  ],
  controller.register
);



module.exports = router;
