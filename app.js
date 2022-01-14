/////////////////////////////////////to use lowdb package
/*
1.npm i lowdb@1.0.0
2.create a db.json in models folder

*/

//MVC architecture design pattern
// M stands for MODEL (database)
// V stands for VIEW (frontend)
// C stands for CONTROLLER (functionality)
/* The Model contains only the pure application data, it contains no logic describing how to present the data to a user.
The View presents the model’s data to the user. The view knows how to access the model’s data, but it does not know what this data means or what the user can do to manipulate it.
The Controller exists between the view and the model. It listens to events triggered by the view (or another external source) and executes the appropriate reaction to these events. In most cases, the reaction is to call a method on the model. Since the view and the model are connected through a notification mechanism, the result of this action is then automatically reflected in the view. */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//import the routes
const usersRoute = require("./routes/usersRoute");
const indexRoute = require("./routes/indexRoute");
const recordsRoute = require("./routes/recordsRoute");
const ordersRoute = require("./routes/ordersRoute");
const cookieParser = require("cookie-parser");
//we dont put authentication in app.use("/users") because we need to check first it is correct user or not
const authentication = require("./middlewares/auth");
const PORT = process.env.PORT || 4000;
//sudo kill -9 $(sudo lsof -t -i:4000)
//lsof -t -i:4000

//create mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/record-live-shop", () => {
  console.log("connection established...... with mongo");
});

//custom middleware==> everytime see the app.use(myMiddleware) ==> execute this
//middle ware is
const myMiddleware = (req, res, next) => {
  req.hello = "world";
  next(); //go down and execute
};

//middleware
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
app.use(cors({ origin: "http://localhost:3000", exposedHeaders: ["token"] })); //to see the token on front end side
//"http://localhost:3000"==> only this user can see the token
// app.use(cors({ origin: "http://localhost:3000" }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   //res.header("Access-Control-Allow-Origin", "*");=>for all

//   res.header("test-header", "value");
//   next();
// });

//instead of this we can install npm i cors;
app.use(cookieParser());

// app.use(myMiddleware);

// ************************  PATHS and MIDDLEWARES  ******************************
//go to routes
//index route
app.use("/", indexRoute);
//users route
app.use("/users", usersRoute);

//records route
app.use("/records", recordsRoute); //if authentication(from middleware folder) is correct go recordsRoute requests

//orders route
app.use("/orders", authentication, ordersRoute); //if authentication(from middleware folder) go recordsRoute requests
app.get("/verifytoken", authentication, (req, res, next) => {
  const user = req.user;
  console.log(req.user);
  res.send({ success: true, data: user });
});
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
