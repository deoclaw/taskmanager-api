const express = require("express");
const router = express.Router(); //we need to route
const tasksController = require("../controllers/tasksController");

//this is the root of /tasks
//chain all our methods that we'll pass controllers to
router
	.route("/")
	.get(tasksController.getAllTasks)
	.post(tasksController.createNewTask)
	.patch(tasksController.updateTask)
	.delete(tasksController.deleteTask);

module.exports = router;
