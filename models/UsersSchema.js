const mongoose = require("mongoose");

//we will create a schema

//first we imported schema object
const { Schema } = mongoose;

//we need to follow schema, the keys should match same number
//*************************to create a virtual property inside the mongoose
/*
to show full name
inside the userRoute ==> userSchema.virtual("fullname").get()...{
    this keyword reference of the Schema
    but inside the json we can not see vurtual property. thats why inside the userSchema 
    we need to pass second object
    {toJSON:{virtuals:true}}
}
*/
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: [10, "throw this error too long"],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [10, "throw this error too short"],
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token:{type:String},
    adress: {
      //address is optional not required. if you dont write it does not throws error.
      city: { type: String },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//it show also fullname infotrmation
userSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("email_domain").get(function () {
  return this.email.split("@")[1];
});
/*
 {
            "_id": "61d2d3ec1591b7db6ece130e",
            "firstName": "Dorothea",
            "lastName": "Rolfson",
            "email": "Keshawn_Gusikowski@gmail.com",
            "password": "DO5OsHJ096vmzlf",
            "__v": 0,
        ****    "fullname": "Dorothea Rolfson",********
            "id": "61d2d3ec1591b7db6ece130e"
        },
*/

//this is a constructor thats why we use upper  case
//IT CREATES A "users" collection on  "record-live-shop" database
const UsersCollection = mongoose.model("users", userSchema);
module.exports = UsersCollection;
