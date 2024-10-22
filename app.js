const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize Express app
const app = express();
const port = 3000;

// mongoose connection url

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb+srv://nithindev:uHe@FRF44u7rDs5@cluster0.rxruo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to MongoDB Cluster");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const homeRoute = require("./routes/homeRoute");
const teacherRoute = require("./routes/teacherRoute");
const studentRoute = require("./routes/studentRoute");
const pageRoute = require("./routes/pageRoute");

app.use("/", homeRoute);
app.use("/teacher", teacherRoute);
app.use("/student", studentRoute);
app.use("/page", pageRoute);

// Start the server
async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
