//npm i lowdb@1.0.0
//for testing purposes

//import lowdb
const low = require("lowdb");
//to help create a file
const FileSync = require("lowdb/adapters/FileSync");
//this is a constructor
const adapter = new FileSync("./models/database.json");
//which file we want to create
//we are storing all data inside the db
const db = low(adapter);

//what data we want to store
// db.defaults({ users: [], records: [], orders: [] }).write();

//  write()==>to save the data
//after this comment it out
module.exports = db;
