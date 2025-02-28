const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors"); // 引入cors包
const app = express();
const userRouter = require("./routes/user/user"); // 引入用户路由
const emailRouter = require("./routes/email/email"); // 引入邮箱路由
const testRouter = require("./routes/test/test"); // 引入测试路由
const routeRouter = require("./routes/route/route"); // 引入路线路由
const experienceRoutes = require("./routes/experience/experience"); // 引入experience路由

const authenticateToken = require("./middleware/auth"); // 引入验证token的中间件

app.use(cors()); // 使用cors中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", userRouter);
app.post("/verify", emailRouter);
app.post("/getRoute", routeRouter);
app.use("/experience", experienceRoutes);
app.post("/test", authenticateToken, testRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
