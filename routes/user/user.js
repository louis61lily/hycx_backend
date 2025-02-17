const express = require("express");
const router = express.Router();

// 登录路径
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

module.exports = router;
