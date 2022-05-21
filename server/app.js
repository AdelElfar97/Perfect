require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
// const asyncHandler = require("express-async-handler");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("tiny"));

//CORS
 app.use(cors());
 app.get('/',(req,res)=>{
   res.send("hellow world")
 })
 app.use((request, response, next) => {
   response.header("Access-Control-Allow-Origin", "*");
   response.header(
     "Access-Control-Allow-Methods",
     "GET,POST,DELETE,PUT,OPTIONS"
  );
   response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
   next();
 });

//Connect to DB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => {
    console.log("DB Error.",e);
  });

//Listen To port
app.listen(process.env.PORT||8080);
//Import Routes
const authenticationRouter = require("./routes/authRouter");

const userRouter = require("./routes/userRouter");

const studentRouter = require("./routes/studentRouter");


app.use(authenticationRouter);
app.use(userRouter);
app.use(studentRouter);


//Not found MW
app.use((request, response) => {
  response.status(404).json({ data: "Not Found" });
});

//Error MW
app.use((error, request, response, next) => {
  //JS  code function.length
  let status = error.status || 500;
  response.status(status).json({ Error: error + "" });
});
