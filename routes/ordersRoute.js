const express = require("express");
const router = express.Router();
const OrdersCollection = require("../models/OrdersSchema");
const {
  getOrders,
  createOrder,
  updateOrderPut,
  updateOrderPatch,
  deleteOrder,
  getSingleOrder,
} = require("../controllers/ordersControllers");

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

//******************************++to prevent duplicate (to refactoring)*****************************
//for ===> /
// router.route("/").get(getOrders).post(createOrder).....
//for ===> /:id
//router.route("/:id").put(updateOrderPut).patch(updateOrderPatch).delete(deleteOrder).get(getSingleOrder)

router.get("/", getOrders);

//Create new record
router.post("/", createOrder);

//Request method PUT (replacing existing resource) and PATCH (updating existing resource)
//Update order
router.put("/:id", updateOrderPut);

//Patch
router.patch("/:id", updateOrderPatch);

//Delete request
//delete order
router.delete("/:id", deleteOrder);

//Read order
//endpoint /records/:id
router.get("/:id", getSingleOrder);

module.exports = router;
