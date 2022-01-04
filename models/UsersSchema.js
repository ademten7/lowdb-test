const mongoose = require("mongoose");

//we will create a schema

//first we imported schema object
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  //   address: addSchema
});

//this is a constructor thats why we use upper  case
const UsersCollection = mongoose.model("users", userSchema);
module.exports = UsersCollection;
