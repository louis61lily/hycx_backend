const express = require("express");
const router = express.Router();
const { verificationCodes } = require("../../functions/email");
const { insertUser } = require("../../database/db");

// 登录并验证验证码路径
router.post("/login", async (req, res) => {
  const { email, code } = req.body;
  const currentTime = Date.now();
  const verificationData = verificationCodes[email];

  if (verificationData) {
    const { code: storedCode, timestamp } = verificationData;
    const isCodeValid = storedCode === parseInt(code, 10);
    const isCodeExpired = currentTime - timestamp > 3 * 60 * 1000; // 3分钟

    if (isCodeValid && !isCodeExpired) {
      const { userId, token } = await insertUser(email, 0);
      res.status(200).json({ code: 1, message: "验证成功", userId, token });
    } else if (isCodeExpired) {
      res.status(400).json({ code: 0, message: "验证码失效" });
    } else {
      res.status(400).json({ code: 0, message: "无效的验证码" });
    }
  } else {
    res.status(400).json({ code: 0, message: "无效的验证码" });
  }
});

module.exports = router;
