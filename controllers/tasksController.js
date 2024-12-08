const Task = require("../models/Task");

const asyncHandler = require("express-async-handler");
//avoids try catch blocks

// GET /tasks
// private?
const getAllTasks = asyncHandler(async (req, res) => {
	//get all tasks from mongoDB but need lean so it trims down
	const tasks = await Task.find().lean();

	//if no tasks
	if (!tasks?.length) {
		return res.status(400).json({ message: "No tasks found" });
	}

	res.json(tasks);

	//if I tie a task to a user...but then I'd have to find a way to match the logged in user with the username so...pin on this

	//add username to each task--have to grab them from the user list
	// const tasksWithUser = await Promise.all(
	// 	tasks.map(async (task) => {
	// 		const user = await User.findById(task.user).lean().exec();
	// 		return { ...task, username: user.username }; //adds a key
	// 	})
	// );
	// res.json(tasksWithUser);
});

const createNewTask = asyncHandler(async (req, res) => {
	const { title, text, priority = "low" } = req.body;

	//confirm user, title, text
	if (!title || !text) {
		return res.status(400).json({ message: "All fields required" });
	}

	//find duplcates
	const duplicate = await Task.findOne({ title }).lean().exec();

	if (duplicate) {
		return res.status(409).json({ message: "Duplicate task title" });
	}

	//create new task
	const task = await Task.create({ title, text, priority });

	if (task) {
		return res.status(201).json({ message: "Task created" });
	} else {
		return res.status(400).json({ message: "Invalid data" });
	}
});

const updateTask = asyncHandler(async (req, res) => {
	const { id, title, text, priority, completed } = req.body;

	//confirm user, title, text
	if (!id || !title || !text || !priority || typeof completed !== "boolean") {
		return res.status(400).json({ message: "All fields required" });
	}

	//find task
	const task = await Task.findById(id).exec();

	if (!task) {
		return res.status(400).json({ message: "TAsk not found" });
	}

	//check duplicates
	const duplicate = await Task.findOne({ title }).lean().exec();

	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(409).json({ message: "Duplicate task title" });
	}

	task.title = title;
	task.text = text;
	task.priority = priority;
	task.completed = completed;

	const updatedTask = await task.save();

	res.json(`'${updatedTask.title}' updated`);
});

const deleteTask = asyncHandler(async (req, res) => {
	const { id } = req.body;

	// Confirm data
	if (!id) {
		return res.status(400).json({ message: "Task ID required" });
	}

	// Confirm note exists to delete
	const task = await Task.findById(id).exec();

	if (!task) {
		return res.status(400).json({ message: "Task not found" });
	}

	const result = await task.deleteOne();

	const reply = `Task '${task.title}' with ID ${task.id} deleted`;

	res.json(reply);
});

module.exports = {
	getAllTasks,
	createNewTask,
	updateTask,
	deleteTask,
};
