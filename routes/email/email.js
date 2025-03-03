const express = require("express");
const router = express.Router();
const { main: sendEmail } = require("../../functions/email");

// 定义 /verify 路由， 用于用户获取验证码
router.post("/verify", async (req, res) => {
  const { mail } = req.body;
  try {
    const response = await sendEmail({ mail: mail });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "发送验证码发生错误" });
  }
});

module.exports = router;
