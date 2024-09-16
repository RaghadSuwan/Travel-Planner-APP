const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const getCoordinates = require("./getCoordinates");
const getImageUrl = require("./getImageUrl");
const getWeatherData = require("./getWeatherData");

let travelData = []; // لتخزين بيانات الرحلات

module.exports = function initApp(app, express) {
  /* إعداد Middleware */
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static("dist")); // لخدمة الملفات الثابتة

  // المسار الرئيسي الذي يعرض الصفحة الرئيسية
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  // Route لاختبار الخادم
  app.get("/test", (req, res) => {
    res.json({
      title: "test json response",
      message: "this is a message",
      time: "now",
    });
  });

  // جلب جميع بيانات الرحلات
  app.get("/trip", (req, res) => {
    res.json(travelData);
  });

  // إضافة أو تحديث بيانات الرحلة
  app.post("/trip", (req, res) => {
    const { place, date, note } = req.body;

    getCoordinates(process.env.GEONAMES_USERNAME, place)
      .then((coordinates) => {
        return getImageUrl(process.env.PIXABAY_API_KEY, place).then((imageUrl) => ({
          coordinates,
          imageUrl,
        }));
      })
      .then(({ coordinates, imageUrl }) => {
        if (coordinates) {
          return getWeatherData(
            process.env.WEATHERBIT_API_KEY,
            coordinates.lat,
            coordinates.lng
          ).then((weather) => ({
            weatherInfo: weather,
            imageUrl,
          }));
        } else {
          return { weatherInfo: {}, imageUrl };
        }
      })
      .then(({ weatherInfo, imageUrl }) => {
        const newTrip = {
          name: place,
          date: date,
          note: note,
          image: imageUrl,
          high: weatherInfo.high || "No data available",
          low: weatherInfo.low || "No data available",
          weather: weatherInfo.weather || "No data available",
        };

        travelData = [newTrip, ...travelData];
        res.json({ success: true });
      })
      .catch((error) => {
        console.error("Error processing trip data:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      });
  });

  // حذف بيانات رحلة معينة
  app.delete("/trip", (req, res) => {
    const { id } = req.body;
    if (id >= 0 && id < travelData.length) {
      travelData = travelData.filter((_, index) => index !== id);
      res.json({ success: true, deletedId: id });
    } else {
      res.status(400).json({ success: false, error: "Invalid ID" });
    }
  });
};
