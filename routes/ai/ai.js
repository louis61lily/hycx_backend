const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");

router.post("/", async (req, res) => {
  try {
    const { departure, destination, type } = req.body;
    const response = await axios.post(
      "https://spark-api-open.xf-yun.com/v1/chat/completions",
      {
        model: "lite",
        messages: [
          {
            role: "user",
            content: `请帮我生成一个从${departure}到${destination}的非常详细的${type}攻略，包括时间安排。另外有以下要求：1.生成的内容不需要开头和结尾的无关文字 2.如果无法生成，只需要返回“无法生成 3.交通攻略只返回交通信息，旅游攻略需要十分详尽”`
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fvOeYekHpulcZjLdVIxk:EcmLPTqhOgtSnjHoaZbv"
        }
      }
    );
    res.json(response.data.choices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "请求出错" });
  }
});

module.exports = router;
