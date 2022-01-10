//dont forget to import routes inside app.js
// const userRoute = require("./routes/usersRoute");
// app.use("/users", userRoute);

//first create schema in models folder
//then create route in router folder
//than inside the app import the route 

//mongoose is a only package it helps only connection to server and mongo db.
//***************************which user has this order?
/*
order ==user ===> one to one relation
order==record==> one to many relation. thats why it is inside the array
collectionlar arasi iliski sql deki table larin aynisi aralarinda baglanti kuruluyor.
*/ 

//*********************************to hash the password 

//npm i bcrypt and import it inside the routers/usersRouter.js
//this keyword is reference to userSchema where password is stored.
//next()==> mongoose store function and go further

//*************************to create a virtual property inside the mongoose 
/*
to show full name
inside the userSchema ==> userSchema.virtual("fullname").get()...{
    this keyword reference of the Schema
    but inside the json we can not see vurtual property. thats why inside the userSchema 
    we need to pass second object
    {toJSON:{virtuals:true}}
}

******************************* we can also create different functions as well
we can use instance
userSchema.methods.printFullName=function(){
    console.log(this.fullName)
    to call the method inside the userRecords ==> user.printFullName();
    
}


********************************  we can also create a static method
we dont need to  use instance we can use it only inside the static.
userSchema.statics.findByName=async function(name){
    return  "user data" 
}
to call the method inside userRecords UsersCollection.findByName 



*/ 
