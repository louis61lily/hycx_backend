const express = require("express");
const router = express.Router();
const axios = require("axios");
const way = ["/driving", "/walking", "/transit/integrated"];
const key = "d74cf6f472d521cdf07d2d9d876208a1";

const baseUrl = "https://restapi.amap.com/v3/direction";

router.post("/getRoute", async (req, res) => {
  const { origin, destination, wayCode } = req.body;
  console.log(baseUrl + way[wayCode], "@@@@@@@@@");

  try {
    const response = await axios.get(baseUrl + way[wayCode], {
      params: {
        key,
        origin,
        destination
      }
    });
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.error("请求出错:", error);
    res.status(500).send("请求出错，请稍后重试");
  }
});

module.exports = router;
