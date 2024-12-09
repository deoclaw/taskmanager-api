//we no longer need dotenv but in package.json, add --env-file=.env flag between nodemon and server
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions"); //we built this over in config
const connectDB = require("./config/dbConn"); //needed to connect to connection fxn
const mongoose = require("mongoose"); //need this
const PORT = process.env.PORT || 3500;
//

connectDB();

//middleware
// CORS middleware.
// Must enable this so this site can be requested from other locations
//literally have to make it all open???
app.use(cors());

//built-in
app.use(express.json()); //lets app receive and parse json so api will work

//3rd party middleware
//parse cookies - useful if I can manage JWT...
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public"))); //serve static files (images, etc)

app.use("/", require("./routes/root")); //we want routes for our api

app.use("/tasks", require("./routes/taskRoutes.js"));

//404 handler
app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ message: "404 Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

//wrap in listener for mongoose connection
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

//listen for errors
mongoose.connection.on("error", (err) => {
	console.log(err);
});
