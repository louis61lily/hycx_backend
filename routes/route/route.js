const express = require("express");
const router = express.Router();
const axios = require("axios");
const way = ["/driving", "/walking", "/transit/integrated"];
const key = "d74cf6f472d521cdf07d2d9d876208a1";

const baseUrl = "https://restapi.amap.com/v3/direction";

router.post("/getRoute", async (req, res) => {
  const { origin, destination, wayCode } = req.body;
  console.log(origin, destination, wayCode, "@@@@@@@");

  // 封装获取经纬度的函数
  const getLocation = async (address) => {
    try {
      const response = await axios.post(
        "https://restapi.amap.com/v3/geocode/geo",
        null, // 第二个参数是请求体，所以传 null
        {
          params: {
            key,
            address
          }
        }
      );
      const geocodes = response.data.geocodes;
      if (geocodes && geocodes.length > 0) {
        return geocodes[0].location;
      } else {
        throw new Error("未找到地址的经纬度信息");
      }
    } catch (error) {
      console.error("获取经纬度信息出错:", error);
      throw error;
    }
  };

  try {
    // 获取起点和终点的经纬度
    const originLocation = await getLocation(origin);
    const destinationLocation = await getLocation(destination);

    // 请求路线信息
    const response = await axios.get(baseUrl + way[wayCode], {
      params: {
        key,
        origin: originLocation,
        destination: destinationLocation
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
