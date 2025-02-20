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
    const isCodeExpired = currentTime - timestamp > 1 * 60 * 1000; // 1分钟

    if (isCodeValid && !isCodeExpired) {
      const { userId, token } = await insertUser(email, 0);
      res
        .status(200)
        .json({ code: 1, message: "Verification successful", userId, token });
    } else if (isCodeExpired) {
      res.status(400).json({ code: 0, message: "Verification code expired" });
    } else {
      res.status(400).json({ code: 0, message: "Invalid verification code" });
    }
  } else {
    res.status(400).json({ code: 0, message: "Invalid verification code" });
  }
});

module.exports = router;
