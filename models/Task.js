const mongoose = require("mongoose");

//what data would a task store? title, completed or not, maybe priority which will have a color? and maybe assigned to users if and only if we can manage some gd authentication
const taskSchema = new mongoose.Schema(
	{
		// user: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	required: true,
		// 	ref: "User",
		// },
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		priority: {
			type: String,
			default: "low",
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Task", taskSchema);
