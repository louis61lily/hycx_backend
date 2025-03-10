const express = require("express");
const router = express.Router();
const experienceDB = require("../../database/experience");

// 获取所有 experience 数据
router.get("/", async (req, res) => {
  try {
    const experiences = await experienceDB.getAllExperiences();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "操作失败！" });
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
      res.status(404).json({ message: "操作失败！" });
    }
  } catch (error) {
    res.status(500).json({ message: "操作失败！" });
  }
});

// 插入新的 experience 数据
router.post("/", async (req, res) => {
  try {
    const { departure, destination, publisher, content, summary } = req.body;
    const id = await experienceDB.insertExperience(
      departure,
      destination,
      publisher,
      content,
      summary
    );
    res.status(201).json({ id, message: "操作成功！" });
  } catch (error) {
    res.status(500).json({ message: "操作失败！" });
  }
});

// 更新 experience 数据
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { departure, destination, publisher, content, summary } = req.body;
    const success = await experienceDB.updateExperience(
      id,
      departure,
      destination,
      publisher,
      content,
      summary
    );
    if (success) {
      res.json({ message: "操作成功" });
    } else {
      res.status(404).json({ message: "操作失败！" });
    }
  } catch (error) {
    res.status(500).json({ message: "操作失败！" });
  }
});

// 根据出发地或目的地搜索 experience 数据
router.post("/search", async (req, res) => {
  try {
    const { keyword } = req.body;
    console.log(req.body);
    const experiences = await experienceDB.searchExperiences(keyword);
    res.json(experiences);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "操作失败！" });
  }
});

// 分页获取 experience 数据
router.post("/page", async (req, res) => {
  try {
    const { page, pageSize } = req.body;
    const { data, total, totalPage } = await experienceDB.getExperiencesByPage(
      page,
      pageSize
    );
    res.json({ data, total, totalPage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "操作失败！" });
  }
});

module.exports = router;
