const dotenv = require("dotenv/config");
const express = require("express");
const initapp = require("../client/script/app.js");
const app = express();
const PORT = process.env.PORT || 8000;
initapp(app, express);
app.listen(PORT, () => {
    console.log(`Server is running.. ${PORT}`);
})