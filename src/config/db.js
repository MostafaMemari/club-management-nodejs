const mongoose = require("mongoose");

function connectToMongoDB(url) {
  mongoose
    .connect(url)
    .then(() => console.log("Connect to DB successfully...."))
    .catch((err) => {
      console.log(err.message);
    });

  mongoose.connection.on("connected", () => {
    console.log("mongoose connected To DB");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("mongoose connection is disconnected");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("disconnected");

    process.exit(0);
  });
}

module.exports = {
  connectToMongoDB,
};
