"use strict";
const nodemailer = require("nodemailer");
const verificationCodes = {}; // 用于存储验证码的对象

const main = async (event, context) => {
  const { mail } = event;

  // 创建6位随机验证码
  const code = Math.floor(Math.random() * 900000) + 100000;

  // 将验证码和生成时间存储在内存中
  verificationCodes[mail] = {
    code,
    timestamp: Date.now()
  };

  // 创建一个 SMTP 服务器配置对象
  let transporter = nodemailer.createTransport({
    service: "QQ", // 使用 QQ 邮箱服务
    auth: {
      user: "2809873625@qq.com", // 发送方邮箱
      pass: "rxrxxfcqrjwndccd" // 发送方邮箱授权码，需要替换为实际的授权码
    }
  });

  // 邮件内容
  let mailOptions = {
    from: "2809873625@qq.com", // 发送方邮箱
    to: mail, // 接收方邮箱
    subject: "验证码", // 邮件主题
    text: "您的验证码是：" + code + "，此验证码1分钟内有效。" // 邮件正文（纯文本）
    // html: '<b>您的验证码是：' + code + '</b>' // 邮件正文（HTML 格式）
  };

  try {
    // 发送邮件
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    // 预览邮件链接
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // 返回数据给客户端
    return {
      code: 1,
      data: {
        mail,
        code
      },
      msg: "发送成功"
    };
  } catch (error) {
    console.error(error);
    return {
      code: 0,
      msg: "发送失败"
    };
  }
};

module.exports = {
  main,
  verificationCodes // 导出验证码对象
};
