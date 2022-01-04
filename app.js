/////////////////////////////////////to use lowdb package
/*
1.npm i lowdb@1.0.0
2.create a db.json in models folder

*/
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//import the routes
const usersRoute = require("./routes/usersRoute");
const indexRoute = require("./routes/indexRoute");
const recordsRoute = require("./routes/recordsRoute");
const ordersRoute = require("./routes/ordersRoute");

const PORT = process.env.PORT || 4001;

//create mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/record-live-shop", () => {
  console.log("connection established...... with mongo");
});

app.use(express.json());

////////////////////      TO GET DATA FROM FROM FRONTEND
//dont forget to change index.html from build folder
//copy build folder from front and paste to backend folder
//server static files
// app.use(express.static(__dirname + "/build"));
//after that we dont need cors. comment out
//cors middleware

//cors middleware: ==>it is  secure way the communication from one server to another server
//to connect frontend
//cors middleware
app.use(cors());
// app.use(cors({ origin: "http://localhost:3000" }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   //res.header("Access-Control-Allow-Origin", "*");=>for all

//   res.header("test-header", "value");
//   next();
// });

//instead of this we can install npm i cors;

// ************************  PATHS   ******************************
//go to routes
//index route
app.use("/", indexRoute);
//users route
app.use("/users", usersRoute);

//records route
app.use("/records", recordsRoute);

//orders route
app.use("/orders", ordersRoute);

//************************************ */ handling 404 page not found
//if you enter wrong url show this page
//put this always before the app.listen
//if compiler reach this line execute this code
app.use((req, res, next) => {
  res.sendFile(__dirname + "/views/notfound.html");
});

//*******************************error handler */universal error handler
//it receive 4 argument===err, req, res, next
app.use((err, req, res, next) => {
  //if there is an erro show this status and message
  //this message and status are coming from userRouter.js
  //we created error and error object has message and status
  //if we dont create any status throw 500 as status
  res.status(err.status || 500).send({ success: false, message: err.message });
  //always send message json format ===>res.send({ success: false, message: err.message });
  /*
    {
      "success": false,
      "message": "no such user available"
      }
    */
});

app.listen(PORT, () => console.log(`server is running on :${PORT}`));
