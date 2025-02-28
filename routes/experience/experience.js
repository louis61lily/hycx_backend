const express = require("express");
const router = express.Router();
const experienceDB = require("../../database/experience");

// 获取所有 experience 数据
router.get("/", async (req, res) => {
  try {
    const experiences = await experienceDB.getAllExperiences();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 根据 ID 获取单个 experience 数据
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const experience = await experienceDB.getExperienceById(id);
    if (experience) {
      res.json(experience);
    } else {
      res.status(404).json({ error: "Experience not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 插入新的 experience 数据
router.post("/", async (req, res) => {
  try {
    const { departure, destination, publisher, content } = req.body;
    const id = await experienceDB.insertExperience(
      departure,
      destination,
      publisher,
      content
    );
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 更新 experience 数据
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { departure, destination, publisher, content } = req.body;
    const success = await experienceDB.updateExperience(
      id,
      departure,
      destination,
      publisher,
      content
    );
    if (success) {
      res.json({ message: "Experience updated successfully" });
    } else {
      res.status(404).json({ error: "Experience not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 删除 experience 数据
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const success = await experienceDB.deleteExperience(id);
    if (success) {
      res.json({ message: "Experience deleted successfully" });
    } else {
      res.status(404).json({ error: "Experience not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
