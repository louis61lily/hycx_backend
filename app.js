const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors"); // 引入cors包
const app = express();
const { testDatabaseConnection, insertUser } = require("./db");

// 调用测试函数
testDatabaseConnection();
insertUser("123@123.com");

app.use(cors()); // 使用cors中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the path planning backend!");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
