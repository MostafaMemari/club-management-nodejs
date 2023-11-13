const Application = require("./src/server");

const DB_URI = `${process.env.BASE_URL}/clubManagement`;

new Application(process.env.PORT, DB_URI);
