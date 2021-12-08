const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
//after save this line kill terminal and comment out db.defaults({ users: [], records: [], orders: [] }).write();
//inside db.js from models folder
const db = require("../models/db");

//GET
router.get("/", (req, res, next) => {
  const users = db.get("users").value();
  //const users = db.get("users[0}")limit(2).value();
  db.set("name", "Naqvi").write();
  if (users) {
    res.send({ success: true, data: users });
  } else {
    const err = new Error("There is no available users in system");
    next(err);
  }
});

//GET with params
router.get("/:id", (req, res, next) => {
  const user = db
    .get("users")
    .find({ id: Number(req.params.id) })
    .value();
  //    we can check more than one properties
  //   .find({ id: Number(req.params.id), first_name: "Lindsay" })

  if (user) {
    res.status(201).send({ success: true, data: user });
  } else {
    const err = new Error("There is no available user in system");
    err.status = 404;
    next(err);
  }
});

//POST
router.post("/", (req, res, next) => {
  db.get("users").push(req.body).write();
  if (req.body) {
    res.send({ success: true, data: db.get("users").value() });
  } else {
    const err = new Error("Please enter add new data about user");
  }
});

//PUT
router.put("/:id", (req, res, next) => {
  const user = db
    .get("users")
    .find({ id: Number(req.params.id) })
    .assign({ ...req.body })
    .write();
  if (user) {
    res.status(201).send({ success: true, data: user });
  } else {
    const err = new Error("there is no such user");
    err.status = 404;
    next(err);
  }
});

//DELETE
router.delete("/:id", (req, res, next) => {
  const user = db
    .get("users")
    .find({ id: Number(req.params.id) })
    .value();
  if (user) {
    db.get("users")
      .remove({ id: Number(req.params.id) })
      .write();
    res.status(201).send({ success: true, data: user });
  } else {
    const err = new Error("there is no user available");
    err.status = 404;
    next(err);
  }
});
//PATCH
//Patch
router.patch("/:id", (req, res, next) => {
  const user = db
    .get("users")
    .find({ id: Number(req.params.id) })
    .assign({ ...req.body })
    .write();
  if (user) {
    res.send(user);
  } else {
    const err = new Error("no such user found");
    err.status = 404;
    next(err);
  }
});

/**
 {
    "success": true,
    "data": {
        "id": 12,
        "email": "tobias.funke@reqres.in",
        "first_name": "Tobias",
        "last_name": "Funke",
        "avatar": "https://reqres.in/img/faces/9-image.jpg"
    }
}
 */

module.exports = router;
