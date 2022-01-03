const mongoose = require("mongoose");
const faker = require("faker");

//we will create a schema
//first we imported schema object
const { Schema } = mongoose;

//this is structure of   user document
const userSchema = new Schema({
  firstName: { type: String, required: true, unique: true },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  //   address: addSchema
});

// let addSchema = new Schema({
//     city:{type:String},
//     country:{type:String}

// })

//inside the users we want to store in this schema.
//model means collection
//this is a constructor thats why we use upper  case
const UsersCollection = mongoose.model("users", userSchema);

mongoose.connect(
  "mongodb://127.0.0.1:27017/record-live-shop",

  () => {
    console.log("connected to Mongodb");
  }
);
mongoose.connection.on("disconnected", () => console.log("disconnected db"));
mongoose.connection.on("connected", () => console.log("connected ...."));
mongoose.connection.on("error", (err) =>
  console.log("error message", err.message)
);

for (let i = 0; i < 20; i++) {
  const user = new UsersCollection({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
  user.save();
}

//in mongoose all the code is async

//to run the code ==> node seed

//we will use fake users
//npm i faker

//to find all user
UsersCollection.find().then((data) => {
  console.log(data);
});

//to find single user
// UsersCollection.findOne({ id: "61d2cde43b4a0496fc454bc2" }).then((data) => {
//   console.log(data);
// });

// UsersCollection.findOneAndReplace
//UsersCollection.deleteOne
