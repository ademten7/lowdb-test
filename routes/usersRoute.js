const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//import usersCollection from models folder
const UsersCollection = require("../models/UsersSchema");
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

    res.send({ success: true, data: users });
  } catch (err) {
    next(err);
  }
});

//Create new User

//*********************************to hash the password

//npm i bcrypt and import it inside the routers/usersRouter.js
//this keyword is reference to userSchema where password is stored.
//next()==> mongoose store function and go further

router.post("/", async (req, res, next) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new UsersCollection({ ...req.body, password: hashPassword }); //take the all body an add password with bcrypt

    await user.save();
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

//Request method PUT (replacing existing resource) and PATCH (updating existing resource)
//Update user
router.put("/:id", async (req, res, next) => {
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
router.patch("/:id", async (req, res, next) => {
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
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await UsersCollection.findByIdAndDelete(req.params.id);
    res.send({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

//Read User
//endpoint /users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const user = await UsersCollection.findOne({ _id: req.params.id });
    res.send({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const path = require("path");
// const fs = require("fs");
// //after save this line kill terminal and comment out db.defaults({ users: [], records: [], orders: [] }).write();
// //inside db.js from models folder
// const db = require("../models/db");
// const UsersCollection = require("../models/UsersSchema")

// //GET
// router.get("/", async (req, res, next) => {

//   //if we use async code it is good to use try catch
//   try{
//     const users = UsersCollection.find()
//     res.send({ success: true, data: users });
//   }
//   catch(err){
//     next(err)
//   }

// //   const users = db.get("users").value();
// //   //const users = db.get("users[0}")limit(2).value();
// //   db.set("name", "Naqvi").write();
// //   if (users) {
// //     res.send({ success: true, data: users });
// //   } else {
// //     const err = new Error("There is no available users in system");
// //     next(err);
// //   }
// // });

// //GET with params
// router.get("/:id", (req, res, next) => {
//   const user = db
//     .get("users")
//     .find({ id: Number(req.params.id) })
//     .value();
//   //    we can check more than one properties
//   //   .find({ id: Number(req.params.id), first_name: "Lindsay" })

//   if (user) {
//     res.status(201).send({ success: true, data: user });
//   } else {
//     const err = new Error("There is no available user in system");
//     err.status = 404;
//     next(err);
//   }
// });

// //POST
// router.post("/", async (req, res, next) => {
//   try{
//     const user = new UsersCollection(req.body)
//     await user.save()
//     res.json({success:true, data:user });
//   }
//   catch(err){
//     next(err)
//   }
//   // db.get("users").push(req.body).write();
//   // if (req.body) {
//   //   res.send({ success: true, data: db.get("users").value() });
//   // } else {
//   //   const err = new Error("Please enter add new data about user");
//   // }
// });

// //PUT
// router.put("/:id", (req, res, next) => {
//   const user = db
//     .get("users")
//     .find({ id: Number(req.params.id) })
//     .assign({ ...req.body })
//     .write();
//   if (user) {
//     res.status(201).send({ success: true, data: user });
//   } else {
//     const err = new Error("there is no such user");
//     err.status = 404;
//     next(err);
//   }
// });

// //DELETE
// router.delete("/:id", (req, res, next) => {
//   const user = db
//     .get("users")
//     .find({ id: Number(req.params.id) })
//     .value();
//   if (user) {
//     db.get("users")
//       .remove({ id: Number(req.params.id) })
//       .write();
//     res.status(201).send({ success: true, data: db.get("users").value() });
//   } else {
//     const err = new Error("there is no user available");
//     err.status = 404;
//     next(err);
//   }
// });
// //PATCH
// //Patch
// router.patch("/:id", (req, res, next) => {
//   const user = db
//     .get("users")
//     .find({ id: Number(req.params.id) })
//     .assign({ ...req.body })
//     .write();
//   if (user) {
//     res.send(user);
//   } else {
//     const err = new Error("no such user found");
//     err.status = 404;
//     next(err);
//   }
// });

// /**
//  {
//     "success": true,
//     "data": {
//         "id": 12,
//         "email": "tobias.funke@reqres.in",
//         "first_name": "Tobias",
//         "last_name": "Funke",
//         "avatar": "https://reqres.in/img/faces/9-image.jpg"
//     }
// }
//  */

// module.exports = router;
