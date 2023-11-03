const Application = require("./src/server");
require("dotenv").config();

new Application(process.env.PORT);
