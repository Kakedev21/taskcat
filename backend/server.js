const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDb = require("./config/db");
const colors = require("colors");
const handleError = require("./middleware/errorMiddleware");

connectDb();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/todos", require("./routes/todoRoute"));
app.use("/api/users", require("./routes/userRoute"));

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(handleError);

//server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
