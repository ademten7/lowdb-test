//mongoose is a only package it helps only connection to server and mongo db.
const mongoose = require("mongoose");
const { Schema } = mongoose;
const faker = require("faker");

//***************************which user has this order?
/*
order ==user ===> one to one relation
order==record==> one to many relation. thats why it is inside the array
collectionlar arasi iliski sql deki table larin aynisi aralarinda baglanti kuruluyor.
*/ 

const OrderSchema = new Schema({

  userid: { type: mongoose.Schema.Types.ObjectId, ref: "users", require:true }, //we can add user here without create firstname,lastname,

  //this is a special type which is used mongoose to create a special id
  //ref: means belongs to which collection
  records: [
    {
      recordid: { type: mongoose.Schema.Types.ObjectId, ref: "records", require:true},
      quantity: { type: Number, require:true },
    },
  ], //it should be an array take an id from order
  //after that we can  populate get request to want to see the specific info from records collection
});

const OrdersCollection = mongoose.model("orders", OrderSchema);



module.exports = OrdersCollection;
//in app.js import OrdersCollection.
// const orderRoute = require("./routes/orderRoute");
// app.use("/orders", orderRoute);
