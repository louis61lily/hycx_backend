const mysql = require("mysql2/promise");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 向数据库中插入用户
async function insertUser(email, type = 0) {
  try {
    const connection = await pool.getConnection();
    const timeNow = Date.now();
    // 检查邮箱是否已经存在
    const [existingUser] = await connection.execute(
      "SELECT id, type FROM user WHERE email = ?",
      [email]
    );
    let userId;
    let _type;
    if (existingUser.length > 0) {
      console.log(existingUser[0], "@@@423424532");

      // 邮箱已存在，更新最后登录时间并返回现有用户的 ID
      userId = existingUser[0].id;
      _type = existingUser[0].type === 1 ? 1 : type;
      await connection.execute(
        "UPDATE user SET last_login_time = ? WHERE id = ?",
        [timeNow, userId]
      );
      console.log("User already exists. User ID:", userId);
    } else {
      // 邮箱不存在，插入新用户
      const [result] = await connection.execute(
        "INSERT INTO user (email, type, last_login_time) VALUES (?, ?, ?)",
        [email, type, timeNow]
      );
      userId = result.insertId;
      console.log("User inserted successfully. Inserted ID:", userId);
    }
    connection.release();

    // 生成 JWT
    const token = jwt.sign(
      { id: userId, email: email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d" // 效3天
      }
    );

    return { userId, token, _type };
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
}
module.exports = {
  pool,
  insertUser
};
