/////////////////////////////////////to use lowdb package
/*
1.npm i lowdb@1.0.0
2.create a db.json in models folder

*/
const express = require("express");
const app = express();

const userRoute = require("./routes/usersRouter");

const PORT = process.env.PORT || 4001;
app.use(express.json());

app.use("/users", userRoute);

//************************************ */ handling 404 page not found
//put this always before the app.listen
//if compiler reach this line execute this code
app.use((req, res, next) => {
  res.sendFile(__dirname + "/views/notfound.html");
});

//*******************************error handler */universal error handler
//it receive 4 argument===err, req, res, next
app.use((err, req, res, next) => {
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
