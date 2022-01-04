const mongoose = require("mongoose");
const { Schema } = mongoose;
const faker = require("faker");

const OrderSchema = new Schema({
  record: { type: String, require: true },
  quantity: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
});

const OrdersCollection = mongoose.model("orders", OrderSchema);

for (let i = 0; i < 20; i++) {
  const order = new OrdersCollection({
    record: faker.music.genre(),
    quantity: faker.datatype.number(),
    isAvailable: faker.datatype.boolean(),
  });
  order.save();
}

module.exports = OrdersCollection;
//in app.js import OrdersCollection.
// const orderRoute = require("./routes/orderRoute");
// app.use("/orders", orderRoute);
