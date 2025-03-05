const { pool } = require("./db");

// 获取所有 experience 数据
async function getAllExperiences() {
  try {
    const [rows] = await pool.execute(
      "SELECT id, departure, destination, publisher, content, publish_time, summary FROM route_experience"
    );
    return rows;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
}

// 根据 ID 获取单个 experience 数据
async function getExperienceById(id) {
  try {
    const [rows] = await pool.execute(
      "SELECT id, departure, destination, publisher, content, publish_time, summary  FROM route_experience WHERE id = ?",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error fetching experience by ID:", error);
    throw error;
  }
}

// 插入新的 experience 数据
async function insertExperience(
  departure,
  destination,
  publisher,
  content,
  summary
) {
  try {
    const timeNow = new Date().getTime();
    const [result] = await pool.execute(
      "INSERT INTO route_experience (departure, destination, publisher, content, summary, publish_time) VALUES (?, ?, ?, ?, ?, ?)",
      [departure, destination, publisher, content, summary, timeNow]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error inserting experience:", error);
    throw error;
  }
}

// 更新 experience 数据
async function updateExperience(
  id,
  departure,
  destination,
  publisher,
  content,
  summary
) {
  try {
    const timeNow = new Date().getTime();
    const [result] = await pool.execute(
      "UPDATE route_experience SET departure = ?, destination = ?, publisher = ?, content = ?, publish_time = ?, summary =? WHERE id = ?",
      [departure, destination, publisher, content, timeNow, summary, id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating experience:", error);
    throw error;
  }
}

async function searchExperiences(keyword) {
  const query =
    "SELECT * FROM route_experience WHERE departure LIKE ? OR destination LIKE ?";
  const values = [`%${keyword}%`, `%${keyword}%`];
  const [rows] = await pool.query(query, values);
  return rows;
}
async function getExperiencesByPage(page, pageSize) {
  try {
    // 计算偏移量
    const offset = (page - 1) * pageSize;
    const sql = `SELECT id, departure, destination, publisher, content, publish_time, summary FROM route_experience LIMIT ${pageSize} OFFSET ${offset}`;
    // 查询当前页的数据
    const [data] = await pool.execute(sql);
    // 查询数据总数
    const [totalRows] = await pool.execute(
      "SELECT COUNT(*) as total FROM route_experience"
    );
    const total = totalRows[0].total;

    // 计算总页数
    const totalPage = Math.ceil(total / pageSize);
    console.log(page, pageSize, total, totalPage, "@@@@");

    return {
      data,
      total,
      totalPage
    };
  } catch (error) {
    console.error("Error fetching experiences by page:", error);
    throw error;
  }
}

module.exports = {
  getAllExperiences,
  getExperienceById,
  insertExperience,
  updateExperience,
  searchExperiences,
  getExperiencesByPage
};
