const dotenv = require("dotenv/config");
const express = require("express");
const initApp = require("./app.js");
const app = express(); // تعريف التطبيق هنا
const PORT = process.env.PORT || 8000;

initApp(app, express); // تمرير التطبيق إلى وظيفة initApp

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
