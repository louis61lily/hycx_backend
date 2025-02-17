const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接的函数
async function testDatabaseConnection() {
  try {
    // 从连接池获取一个连接
    const connection = await pool.getConnection();
    console.log("Database connection successful");
    // 释放连接回连接池
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

// 插入数据到 user 表的函数
async function insertUser(email) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "INSERT INTO user (email) VALUES (?)",
      [email]
    );
    connection.release();
    console.log("User inserted successfully. Inserted ID:", result.insertId);
    return result.insertId;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
}

module.exports = {
  pool,
  testDatabaseConnection,
  insertUser
};
