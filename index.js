require("dotenv").config();

const Application = require("./src/server");

new Application(process.env.PORT, process.env.BASE_URL);
