const mongoose = require("mongoose");

//in case we authenticate?
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("User", userSchema);
