const express = require("express");
require("dotenv").config();
const quesRoute = require("./routes/question_route");
const dbUtils = require("./dbutils/dbutil");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api", quesRoute);

app.use(express.json());
dbUtils.initDB();

process.on("SIGINT", () => {
  dbUtils.disconnectDB();
  console.log("Closing server");
  process.exit();
});

process.on("exit", () => {
  console.log("Server closed");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
