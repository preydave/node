// express require
const express = require("express");
const app = express();

const PORT = 3000;

// 👉 Home route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// 👉 Test API
// http://localhost:3000/test
app.get("/test", (req, res) => {
  console.log("test api called....");
  res.send("Test Api Called...");
});

// 👉 Single user object
const user = {
  id: 101,
  name: "amit",
  age: 23,
  salary: 23000,
};

// http://localhost:3000/user
app.get("/user", (req, res) => {
  res.json({
    message: "user fetched successfully!!",
    data: user,
  });
});

// 👉 Dummy users array
const users = [
  { id: 1, name: "raj", age: 23 },
  { id: 2, name: "parth", age: 24 },
  { id: 3, name: "jay", age: 25 },
];

// http://localhost:3000/users
app.get("/users", (req, res) => {
  res.json({
    message: "all users",
    data: users,
  });
});

// 👉 Get user by ID
// http://localhost:3000/user/1
app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id); // convert string to number

  console.log("Requested ID:", id);

  // find user
  const foundUser = users.find((u) => u.id === id);

  if (foundUser) {
    res.json({
      message: "user fetched successfully",
      data: foundUser,
    });
  } else {
    res.status(404).json({
      message: `User not found with id ${id}`,
    });
  }
});

// 👉 Server start
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});