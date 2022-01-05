//mongoose is a only package it helps only connection to server and mongo db.
const mongoose = require("mongoose");
const { Schema } = mongoose;
const faker = require("faker");

const OrderSchema = new Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, //we can add user here without create firstname,lastname,

  //this is a special type which is used mongoose to create a special id
  //ref: means belongs to which collection
  records: [
    {
      recordid: { type: mongoose.Schema.Types.ObjectId, ref: "records" },
      quantity: { type: Number },
    },
  ], //it should be an array take an id from order
});

const OrdersCollection = mongoose.model("orders", OrderSchema);

// for (let i = 0; i < 20; i++) {
//   const order = new OrdersCollection({
//     record: faker.music.genre(),
//     quantity: faker.datatype.number(),
//     isAvailable: faker.datatype.boolean(),
//   });
//   order.save();
// }

module.exports = OrdersCollection;
//in app.js import OrdersCollection.
// const orderRoute = require("./routes/orderRoute");
// app.use("/orders", orderRoute);
