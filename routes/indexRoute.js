const express = require("express");
const path = require("path");
const router = express.Router();

//endpoint //get request
router.get("/", (req, res) => {
  //resolve absolute path using path module
  res.sendFile(path.resolve(__dirname, "../views/index.html"));
});

module.exports = router;
