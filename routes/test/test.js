const express = require("express");
const router = express.Router();

// 定义 /verify 路由， 用于用户获取验证码
router.post("/test", async (req, res) => {
  res.status(200).json({ message: "测试成功" });
});

module.exports = router;
