const express = require("express");
const router = express.Router(); //we need to route
const path = require("path"); //we need to refer to paths to serve

//regex: can start or end at / or index with optional .html
router.get("^/$|/index(.html)?", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
