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

// 删除 experience 数据
async function deleteExperience(id) {
  try {
    const [result] = await pool.execute(
      "DELETE FROM route_experience WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting experience:", error);
    throw error;
  }
}

module.exports = {
  getAllExperiences,
  getExperienceById,
  insertExperience,
  updateExperience,
  deleteExperience
};
