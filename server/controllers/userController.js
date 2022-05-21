const User = require("../models/user");
const asyncHandler = require("express-async-handler");




exports.getUsers = (request, response, next) => {
  //if (request.role != "admin") throw new Error("Not Authorized.");

  User.find()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      next(error.message);
    });
};

exports.deleteUser = (request, response, next) => {
  if (1||request.role == "admin") {
    User.findByIdAndDelete({ _id: request.params.id })
      .then((data) => {
        response.status(201).json({ message: "deleted", data });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    response.status(403).json({ message: "Not Autorized" });
  }
};

exports.getUser = (request, response, next) => {
  User.findOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateUser = async (request, response) => {
  if (1||request.role == "admin") {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        request.params.id,
        {
          $set: request.body,
        },
        { new: true }
      );
      response.status(200).json(updatedUser);
    } catch (err) {
      response.status(500).json(err.message);
    }
  } else {
    response.status(403).json({ message: "Not Autorized" });
  }
};
