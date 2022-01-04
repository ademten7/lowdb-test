const express = require("express");
const router = express.Router();
const OrdersCollection = require("../models/OrdersSchema");

/* const data = fs.readFileSync(path.resolve(__dirname, "../models/db.json"),"utf-8")

console.log(JSON.parse(data))
const users = JSON.parse(data).users; */

// CRUD operation
//Create
//Read
//Update
//Delete

//Read Records
//endpoint /records
router.get("/", async (req, res, next) => {
  try {
    const orders = await OrdersCollection.find(); //to list all orders
    res.send({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
});

//Create new record
router.post("/", async (req, res, next) => {
  try {
    const order = new OrdersCollection(req.body);
    await order.save();
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

//Request method PUT (replacing existing resource) and PATCH (updating existing resource)
//Update order
router.put("/:id", async (req, res, next) => {
  try {
    const order = await OrdersCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

//Patch
router.patch("/:id", async (req, res, next) => {
  try {
    const order = await OrdersCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

//Delete request
//delete order
router.delete("/:id", async (req, res, next) => {
  try {
    const order = await OrdersCollection.findByIdAndDelete(req.params.id);
    res.send({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

//Read order
//endpoint /records/:id
router.get("/:id", async (req, res, next) => {
  try {
    const order = await OrdersCollection.findOne({ _id: req.params.id });
    res.send({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
