const express = require("express");
const router = express.Router();
const RecordsCollection = require("../models/RecordsSchema");

//change also app js

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
    const records = await RecordsCollection.find();
    res.send({ success: true, data: records });
  } catch (err) {
    next(err);
  }
});

//Create new User
router.post("/", async (req, res, next) => {
  try {
    const record = new RecordsCollection(req.body);
    await record.save();
    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});

//Request method PUT (replacing existing resource) and PATCH (updating existing resource)
//Update user
router.put("/:id", async (req, res, next) => {
  try {
    const record = await RecordsCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});

//Patch
router.patch("/:id", async (req, res, next) => {
  try {
    const record = await RecordsCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});

//Delete request
//delete record
router.delete("/:id", async (req, res, next) => {
  try {
    const record = await RecordsCollection.findByIdAndDelete(req.params.id);
    res.send({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});

//Read record
//endpoint /records/:id
router.get("/:id", async (req, res, next) => {
  try {
    const record = await RecordsCollection.findOne({ _id: req.params.id });
    res.send({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
