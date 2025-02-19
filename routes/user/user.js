const express = require("express");
const router = express.Router();
const { verificationCodes } = require("../../functions/email");

// 验证验证码路径
router.post("/login", (req, res) => {
  const { email, code } = req.body;
  const currentTime = Date.now();
  const verificationData = verificationCodes[email];

  if (verificationData) {
    const { code: storedCode, timestamp } = verificationData;
    const isCodeValid = storedCode === parseInt(code, 10);
    const isCodeExpired = currentTime - timestamp > 1 * 60 * 1000; // 10分钟

    if (isCodeValid && !isCodeExpired) {
      res.status(200).json({ code: 1, message: "Verification successful" });
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
