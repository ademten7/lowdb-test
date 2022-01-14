const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//import usersCollection from models folder
const UsersCollection = require("../models/UsersSchema");
const validationMiddlewares = require("../middlewares/ValidationRules");
const jwt = require("jsonwebtoken");
const authentication = require("../middlewares/auth");

// const path = require("path");
// const fs = require("fs");
// const db = require("../models/db");

/* const data = fs.readFileSync(path.resolve(__dirname, "../models/db.json"),"utf-8")

console.log(JSON.parse(data))
const users = JSON.parse(data).users; */

// CRUD operation
//Create
//Read
//Update
//Delete

//Read Users
//endpoint /users
router.get("/", async (req, res, next) => {
  try {
    //find all users
    const users = await UsersCollection.find();
    res.cookie("testing", "special code").send({ success: true, data: users });
  } catch (err) {
    next(err);
  }
});

//Create new User

//*********************************to hash the password

//npm i bcrypt and import it inside the routers/usersRouter.js
//this keyword is reference to userSchema where password is stored.
//next()==> mongoose store function and go further

//REGISTER.
//create a new user /register
router.post(
  "/",
  validationMiddlewares,

  async (req, res, next) => {
    try {
      const hashPassword = bcrypt.hashSync(req.body.password, 10);
      const user = new UsersCollection({ ...req.body, password: hashPassword }); //take the all body an add password with bcrypt

      await user.save();
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }
);

//Request method PUT (replacing existing resource) and PATCH (updating existing resource)
//Update user
router.put("/:id", authentication, async (req, res, next) => {
  try {
    const user = await UsersCollection.findByIdAndUpdate(
      req.params.id, //id i bul
      req.body, //bununlla güncelle
      // new: true==>hemen güncelleme yapiyor.
      { new: true }
    );
    res.send({ success: true, data: user });
  } catch (error) {
    next(err);
  }
});

//Patch
router.patch("/:id", authentication, async (req, res, next) => {
  try {
    const user = await UsersCollection.findByIdAndUpdate(
      req.params.id, //id i bul
      req.body, //bununlla güncelle
      // new: true==>hemen güncelleme yapiyor.
      { new: true }
    );
    res.send({ success: true, data: user });
  } catch (error) {
    next(err);
  }
});

//Delete request
//delete user
router.delete("/:id", authentication, async (req, res, next) => {
  try {
    const user = await UsersCollection.findByIdAndDelete(req.params.id);
    res.send({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

//Read User
//endpoint /users/:id
router.get("/:id", authentication, async (req, res, next) => {
  try {
    const user = await UsersCollection.findOne({ _id: req.params.id });
    res.send({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

//Login
//end point
//"/users/login"
router.post("/login", async (req, res, next) => {
  //authentication
  //we send here only email and password and server send us authentication code.
  const { email, password } = req.body;

  const user = await UsersCollection.findOne({ email: email }); //first check whether there is a user or not

  if (user) {
    //if user is true check the password

    const check = bcrypt.compareSync(password, user.password); //second one should bcrypt password
    if (true) {
      //if password is true
      //create token
      //jwt has 3 built method  sign,verify, decode.
      //sign===to create
      //fist part is payload should be an object, second is("secret-code",) signature(no one can see it it should be in .env file) ,third part is optional

      const token = jwt.sign(
        { email: email, id: user._id }, //first
        "secret-code", //second
        {
          //third
          expiresIn: "1h",
          issuer: "Naqvi",
          audience: "fbw-e04-2",
        }
      );
      // console.log(token);
      user.token = token; //assign token object in user Schema token which we created
      await user.save(); //we save the token in suerSchema
      res.cookie("token", token).send({
        success: true,
        data: user,
        code: "1234",
      });
    } else {
      next({ message: "password doesn't match" });
    }
  } else {
    next({ message: "email doesn't exist" });
  }
});

module.exports = router;
