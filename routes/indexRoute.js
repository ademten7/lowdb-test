const express = require("express");

const router = express.Router();
const {getIndex} = require("../controllers/indexController")

//endpoint //get request
router.get("/", getIndex);

module.exports = router;
