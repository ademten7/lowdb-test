const mongoose = require("mongoose");
const faker = require("faker");

//we will create a schema
//first we imported schema object
const { Schema } = mongoose;

//this is structure of user document not a constructor

// we can create a variable and add in the schema
// let addSchema = new Schema({
//     city:{type:String},
//     country:{type:String}

// })


const userSchema = new Schema({
  firstName: { type: String, required: true, unique: true },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  //   address: addSchema
});

//inside the users we want to store in this schema.
//model means collection
//this is a constructor thats why we use upper  case (UsersCollection)
//we store it inside the UsersCollection
//mangoose create a users collection inside the record-live-shop
const UsersCollection = mongoose.model("users", userSchema);

// to find the connection write==> mongo on the terminal //mongodb://127.0.0.1:27017
//this is local url. second argument is callback.
mongoose.connect("mongodb://127.0.0.1:27017/record-live-shop", () => {
  console.log("connected to Mongodb");
});

//this are listeners and optional
mongoose.connection.on("disconnected", () => console.log("disconnected db"));
mongoose.connection.on("connected", () => console.log("connected ...."));
mongoose.connection.on("error", (err) =>
  console.log("error message", err.message)
);

//to create 20 user at the same time
for (let i = 0; i < 20; i++) {
  const user = new UsersCollection({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    department: faker.commerce.department(),
  });
  //to save into the  database
  user.save();
}

//in mongoose all the code is async

//to run the code write ==> node seed

//we will use fake users
//npm i faker

//to find all user
UsersCollection.find().then((data) => {
  console.log(data);
});

//to find single user
UsersCollection.findOne({ id: "61d2cde43b4a0496fc454bc2" }).then((data) => {
  console.log({ data });
});

// UsersCollection.findOneAndReplace
//UsersCollection.deleteOne
UsersCollection.findByIdAndDelete({ id: "61d2cde43b4a0496fc454bc2" });
UsersCollection.findOne({ id: "61d2cde43b4a0496fc454bc2" }).then((data) => {
  console.log({ data });
});
