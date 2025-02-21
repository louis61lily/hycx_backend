const jwt = require("jsonwebtoken");
require("dotenv").config();

// 中间件，用于验证token，如果验证失败返回 403，验证成功则调用 next() 方法来允许用户访问受保护资源
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // 如果没有 token，返回 401

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .sendStatus(403)
        .json({ code: 999, message: "token失效请重新登录" }); // 如果 token 无效，返回 403
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
