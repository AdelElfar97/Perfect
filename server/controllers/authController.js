const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const randomBytes = require("randombytes");

const Token = require("../models/token");
const bcrypt = require("bcrypt");
const axios = require("axios"); // manages http requests
require("dotenv").config();
const asyncHandler = require("express-async-handler");



exports.userLogin = (request, response, next) => {
  User.findOne({ username: request.body.username })
    .then((data) => {
      if (data == null) {
        // throw new Error("username not found");
        response.status(401).json({ message: "invalid credentials" });
        return;
      }
      encrypted = data.password;

      bcrypt.compare(request.body.password, encrypted).then(function (result) {
        if (result) {

          let accessToken = jwt.sign(
            {
              role: data.role,
              id: data._id,
              username: data.username,
            },
            process.env.SECRET_KEY,
            { expiresIn: "365d" }
          );
          response.json({ data, accessToken });
        } else {
          response.status(401).json({ message: "invalid credentials" });
          return;
        }
      });
    })
    .catch((error) => {
      //next(error.message);
    });
};


exports.register = asyncHandler(async (request, response, next) => {
  console.log("REQUEST",request.body)
  //Validation
  /*
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  */

  let hashed = bcrypt.hashSync(request.body.password, 10);
  const user = new User({
    username: request.body.username,
    password: hashed,
  });
  try {
    const newUser = await user.save();
    console.log("newUser",newUser)
    let token = await new Token({
      userId: newUser._id,
      token: randomBytes(32).toString("hex"),
    }).save();
    console.log("token",token)


    response.status(201).json(newUser);
  } catch (err) {
    console.log("err",err)
    err.status = 400;
    next(err);
  }
});

exports.updateUser = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }

  User.findOne({ username: request.body.username })

    .then((data) => {
      if (data.role != request.role || data.username != request.username)
        next(Error("login first plz"));
      if (data == null) {
        throw new Error("username not found");
      }

      User.findByIdAndUpdate(data._id, {
        $set: {
          address: request.body.address,
          phone: request.body.phone,
          name: request.body.name,
        },
      }).then((data) => {
        if (data == null) next(new Error("User not fount"));
        response.json({ message: "data updated" });
        // else response.redirect("http://127.0.0.1:5500/index.html")
      });
    })
    .catch((error) => {
      // error.message = "error happened while login3";
      next(error.message);
    });
};