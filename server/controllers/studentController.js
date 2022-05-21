const asyncHandler = require("express-async-handler");
const Student = require("./../models/student");






exports.createStudent = (request, response, next)=> {

    let object = new Student({
        name: request.body.name,
        age:request.body.age
      });

      object
      .save()
      .then((data) => {
        response.status(201).json({ message: "added", data });
      })
      .catch((error) => next(error));
};


exports.getStudents = (request, response, next) => {
  //if (request.role != "admin") throw new Error("Not Authorized.");

  Student.find()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      next(error.message);
    });
};

exports.deleteStudent = (request, response, next) => {
  if (1||request.role == "admin") {
    Student.findByIdAndDelete({ _id: request.params.id })
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

exports.getStudent = (request, response, next) => {
    Student.findOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateStudent = async (request, response) => {
  if (1||request.role == "admin") {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        request.params.id,
        {
          $set: request.body,
        },
        { new: true }
      );
      response.status(200).json(updatedStudent);
    } catch (err) {
      response.status(500).json(err.message);
    }
  } else {
    response.status(403).json({ message: "Not Autorized" });
  }
};
