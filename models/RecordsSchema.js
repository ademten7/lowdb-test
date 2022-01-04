const mongoose = require("mongoose");
const faker = require("faker");

//we will create a schema

//first we imported schema object
const { Schema } = mongoose;

const RecordSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});
const RecordsCollection = mongoose.model("records", RecordSchema);

for (let i = 0; i < 20; i++) {
  const record = new RecordsCollection({
    title: faker.music.genre(),
    artist: faker.name.middleName(),
    year: Math.floor(Math.random() * 40) + 1980,
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  });
  record.save();
}

//this is a constructor thats why we use upper  case
//IT CREATES A "records" collection on  "record-live-shop" database in mongoBD Compass
module.exports = RecordsCollection;

//in app.js import RecordsCollection.
// const userRoute = require("./routes/usersRoute");
// app.use("/users", userRoute);
